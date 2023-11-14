<script>
import { ref } from 'vue';
import axios from 'axios';
import AbsenceDialog from '@/components/AbsenceDialog.vue';

export default {
    components: {
        AbsenceDialog
    },
    setup() {
        const email = ref(null);
        const password = ref(null);
        const showTermsDialog = ref(true);
        const loading = ref(false);
        const showDialog = ref(false);
        const courseAbsences = ref({});
        const loginError = ref(false);

        const onSubmit = async () => {
    
            loading.value = true;

            try {
                const response = await axios.post('/api', {
                    UserId: email.value,
                    Pswd: password.value
                });

                courseAbsences.value = response.data.course_absences;
                showDialog.value = true;
                loginError.value = false;
                loading.value = false;
            } catch (error) {
                console.error('登入失敗:', error);
                loginError.value = true;
                loading.value = false;
            }
        };

        const acceptTerms = () => {
      
            showTermsDialog.value = false;
        };

        return {
            email,
            password,
            showTermsDialog,
            onSubmit,
            acceptTerms,
            loading,
            showDialog,
            courseAbsences,
            loginError
        };
    }
}
</script>
<template>
    <div style="display: flex;">
        <img src="https://www.upmedia.mg/upload/article/20180928111724891043.png" alt="素養啟英" style="height:100vh; width:60%;object-fit: cover;">
        <v-form @submit.prevent="onSubmit">
            <div style="width:100%; margin-left: 50px;">
                <img src="@/assets/cyvslogo.png" alt="" style=" width:340px;  padding-top: 30px; ">
                <br>
                <br>
                <h4>登入</h4>
                <br>
                <input type="text" placeholder="學號" name="uname" required style="margin-bottom: 20px; width:300px;" >
                <input type="password" placeholder="密碼" name="psw" required style="margin-bottom: 20px; width: 300px;">
                <br>
                <BR></BR>
                <div style="padding: 5px; margin-bottom: 20px;">
                    <v-btn type="submit" variant="flat" color="#2672ec" text @click="acceptTerms">登入</v-btn>
                </div>
                <div id="introduction" class="groupMargin">
                    <p><a href="https://utacm.adm.u-tokyo.ac.jp/webmtn/LoginServlet" xt-marked="ok">密碼変更・再設定</a><br><a href="https://utacm.adm.u-tokyo.ac.jp/webmtn/LoginServlet" xt-marked="ok">Change or reset your password</a><br><br><a href="https://utelecon.adm.u-tokyo.ac.jp/utokyo_account/" xt-marked="ok">關於校務系統賬號</a><br><a href="https://utelecon.adm.u-tokyo.ac.jp/en/utokyo_account/" xt-marked="ok">About Chi-Ying Account</a></p>                     
                </div>
            </div>
        </v-form>
    </div>
    <v-dialog v-model="showTermsDialog" persistent max-width="600px">
        <v-card>
            <v-card-title class="text-h5 font-weight-300 mt-4">使用條款</v-card-title>
            <v-card-text class="terms-text">
                <p>在使用本查詢工具前，請詳細閱讀以下條款：</p>
                <ul>
                    <li>本工具僅供學習和查詢使用，請合理安排查詢次數以避免對校務系統造成負擔。</li>
                    <li>如校方認為本服務危害到學校伺服器的穩定性，可通過郵件（<a
                            href="mailto:maplech0218@gmail.com">maplech0218@gmail.com</a>）聯繫開發者進行處理。</li>
                    <li>若無法登入，可能是因為多次嘗試登入導致校務系統暫時封鎖帳號，請稍後再試。</li>
                </ul>
                <p class="text-center"><strong>點擊同意表示您已閱讀並同意以上條款。</strong></p>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn variant="flat" color="#2672ec" text @click="acceptTerms">同意</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<style>
input {
  border: 1px solid #000;
  border-radius: 3PX;
  outline: none;
}
</style>