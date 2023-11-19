<template>
    <div class="flex flex-col items-center justify-center">

        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span
                class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">OpenAI</span>
        </h1>
        <p class="mb-5 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">輕鬆轉換語音檔並生成逐字稿和摘要</p>
        <p class="mb-5 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">目前支援：mp3, mp4, mpeg, mpga, m4a, wav,
            or webm，檔案最大24MB。</p>

        <label for="audio-upload"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
            <div v-if="canUpload" class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="#0B3D91"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span>
                    or
                    drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">MP3 or WAV files (MAX. 24MB)</p>
            </div>

            <div v-else
                class="flex items-center justify-center w-full h-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <div
                    class="px-3 py-1 text-sm font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                    處理中...</div>
            </div>


            <input id="audio-upload" type="file" class="hidden" accept=".mp3,.mp4,.mpeg,.mpga,.m4a,.wav,.webm"
                ref="fileInput" @change="uploadFile" :disabled="!canUpload" />
        </label>

    </div>
</template>

<script setup>
import { ref } from 'vue'
const apiKey = import.meta.env.VITE_VUE_APP_OPENAI_API_KEY;

const fileInput = ref(null)
const canUpload = ref(true)

const uploadFile = async () => {
    canUpload.value = false
    const file = fileInput.value.files[0]
    // await cropAndSplitAudio(file)
    // return

    const formData = new FormData()
    formData.append('file', file)
    const data = await transcribeAudio(file, 'srt')
    console.log('transcribeAudio', data)
    // 輸出字幕檔
    await downloadTranscription(data, `逐字稿_${getFormattedCurrentTime()}.txt`)
    // GPT解析
    const summarize_data = await summarize(extractSRTText(data))
    // 輸出摘要
    await downloadTranscription(summarize_data, `摘要_${getFormattedCurrentTime()}.txt`)

    canUpload.value = true
    return
}

const transcribeAudio = async (audioFile, response_format = 'json') => {
    const apiUrl = 'https://api.openai.com/v1/audio/transcriptions';

    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('model', 'whisper-1');
    formData.append('response_format', response_format);

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to transcribe audio file');
    }

    if (response_format === 'srt') {
        return await response.text();
    } else {
        const data = await response.json();
        return data.text;
    }
}

function extractSRTText(srt) {
    const lines = srt.trim().split("\n");
    let text = "";
    for (let i = 0; i < lines.length; i++) {
        if (!isNaN(lines[i])) { // 如果該行是序號
            i += 2; // 跳過時間軸的那一行
            while (lines[i]) { // 取得該字幕的文字內容
                text += lines[i] + "\n";
                i++;
            }
        }
    }
    return text.trim();
}

async function downloadTranscription(text, filename = 'transcription.txt') {
    console.log('downloadTranscription 開始', text)
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

async function summarize(requestString) {
    console.log('summarize 開始', requestString)

    const messages = [
        { role: "system", content: 'Generate a summary of the given text in traditional Chinese including its theme, key points, and a brief abstract.' },
        { role: "user", content: requestString }
    ];

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages,
            temperature: 0.9,
            max_tokens: 256 * 1,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
        })
    };

    // 使用 OpenAI API 進行文字生成
    return fetch('https://api.openai.com/v1/chat/completions', options)
        .then(res => res.json())
        .then(body => {
            if (body.error) {
                throw body.error;
            }
            return body.choices[0].message.content.trim();
        });
}

function getFormattedCurrentTime() {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    return year + month + day + hour + minute;
}

function cropAndSplitAudio(inputFile, outputFilePrefix, startTime, endTime, maxSizeInMB = 10) {
    return new Promise((resolve, reject) => {
        const fileExtension = inputFile.name.split(".").pop().toLowerCase();
        if (!["mp3", "mp4", "mpeg", "mpga", "m4a", "wav", "webm"].includes(fileExtension)) {
            reject(new Error("Unsupported file format"));
            return;
        }

        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(inputFile);

        fileReader.onload = function () {
            if (fileReader.error) {
                reject(new Error("Error reading file"));
                return;
            }

            const fileSizeInBytes = fileReader.result.byteLength;
            const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
            const maxFileSizeInBytes = Math.min(fileSizeInBytes, maxSizeInBytes);

            const audioContext = new (window.AudioContext || window.webkitAudioContext)();

            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }

            console.log("Decoding audio file", audioContext);
            audioContext.decodeAudioData(fileReader.result, function (buffer) {
                const croppedBuffer = buffer.slice(startTime * buffer.sampleRate, endTime * buffer.sampleRate);

                let numChunks = 1;
                let remainingBytes = croppedBuffer.length * 2; // 2 bytes per sample
                let offset = 0;

                while (remainingBytes > 0) {
                    const chunkSizeInBytes = Math.min(maxFileSizeInBytes, remainingBytes);
                    const chunkSizeInSamples = chunkSizeInBytes / 2;
                    const chunk = new Float32Array(chunkSizeInSamples);

                    for (let i = 0; i < chunkSizeInSamples; i++) {
                        chunk[i] = croppedBuffer.getChannelData(0)[i + offset];
                    }

                    const blob = new Blob([new Int16Array(chunk.buffer)], { type: `audio/${fileExtension}` });
                    const fileName = `${outputFilePrefix}_${numChunks}.${fileExtension}`;
                    const downloadLink = document.createElement("a");
                    downloadLink.href = URL.createObjectURL(blob);
                    downloadLink.download = fileName;
                    downloadLink.click();

                    numChunks++;
                    remainingBytes -= chunkSizeInBytes;
                    offset += chunkSizeInSamples;
                }

                resolve();
            }, function (error) {
                reject(new Error("Error decoding audio data"));
            });
        };
    });
}
</script>
