const tools = [
    {
        path: '/upload',
        name: 'Upload',
        component: () => import(/* webpackChunkName: "upload" */ '@/views/tools/Upload.vue'),
        meta: {
            title: '錄音上傳',
            auth: true,
        },
    },
    {
        path: '/asr',
        name: 'ASR',
        component: () => import(/* webpackChunkName: "asr" */ '@/views/tools/ASR.vue'),
        meta: {
            title: '語音AI對話',
            auth: true,
        },
    },
]

export default tools;
