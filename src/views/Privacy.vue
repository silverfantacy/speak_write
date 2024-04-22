<script setup>
import { ref } from 'vue'
const contact_mail = ref(import.meta.env.VITE_APP_CONTACT_MAIL)
</script>
<template>
    <h1 class="mb-4 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl m-5">
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            本站隱私政策
        </span>
    </h1>

    <p class="mb-4">
        我們十分尊重用戶的隱私，因此本站制定了嚴格的隱私政策，以確保用戶的個人信息得到適當的保護。我們收集的任何信息都僅用於提供更好的服務，並保護用戶的權益。以下是我們的隱私政策：</p>
    <ol class="space-y-2 list-decimal list-inside dark:text-gray-400">
        <li class="text-lg">
            <h3 class="inline-block">信息收集</h3>
            <p class="text-base">
                當您註冊本站帳戶或使用本站的部分服務時，我們可能會收集您的一些個人信息，包括但不限於您的姓名、電子郵件地址、聯繫方式等。我們僅會收集必要的信息，以便能夠更好地為您提供服務。</p>
        </li>
        <li class="text-lg">
            <h3 class="inline-block h3">信息使用</h3>
            <p>
                我們僅會使用收集到的信息來提供服務，包括但不限於向您發送本站的新聞、文章等資訊、回答您的諮詢、舉辦活動、改善我們的產品和服務等。除非經過您的明確同意，我們不會將您的個人信息提供給第三方。</p>
        </li>
        <li class="text-lg">
            <h3 class="inline-block">信息安全</h3>
            <p class="text-base">
                我們非常重視用戶信息的安全性，採取了一系列的安全措施來保護用戶的信息，防止未經授權的訪問、使用或披露。我們會定期檢查和更新我們的安全措施，以確保其有效性。</p>
        </li>
        <li class="text-lg">
            <h3 class="inline-block">Cookie 政策</h3>
            <p class="text-base">我們使用 cookie 來優化用戶的瀏覽體驗和分析網站流量。cookie
                是一種小型數據文件，它被存儲在您的設備上，以記錄您的首選項目和訪問歷史等信息。您可以在您的瀏覽器中設置以拒絕所有
                cookie，或在您使用本站時選擇接受或拒絕 cookie。</p>
        </li>
        <li class="text-lg">
            <h3 class="inline-block">未成年人隱私保護</h3>
            <p class="text-base">
                我們非常關注未成年人的隱私保護。如果您是未成年人，請勿向我們提供任何個人信息。如果我們發現我們已經收集了未成年人的個人信息，我們會立即刪除該信息。</p>
        </li>
        <li class="text-lg">
            <h3 class="inline-block">隱私政策的修改</h3>
            <p class="text-base">
                本服務將妥善保存與利用您的個人資料，若您依個人資料保護法之規定，就個人資料之提供有請求本集團及本服務停止蒐集、處理、利用或刪除之需要時，請聯繫連絡信箱。當您提出停止或刪除個人資料之請求時，即視為您已申請終止使用服務，同時系統會刪除資料
            </p>
            <p class="text-base">
                如對本隱私權政策有任何問題或意見，請隨時聯絡我們的管理員，透過以下連絡信箱聯絡我們：<a class="hover:underline text-red-500"
                    :href="`mailto:${contact_mail}`">{{ contact_mail }}</a>。</p>
        </li>
    </ol>
</template>
