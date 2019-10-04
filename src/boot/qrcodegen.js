//npm install @chenfengyuan/vue-qrcode vue

import VueQrcode from '@chenfengyuan/vue-qrcode';

// "async" is optional
export default async ({ Vue }) => {
  Vue.component(VueQrcode.name, VueQrcode);
}
