import {mapGetters} from "vuex";

let mixin = {
    data: () => ({
        appName: '交通大数据',
    }),
    created() {
    },
    mounted() {
    },
    methods: {
        // 兼容本地地址和在线地址的获取图片地址方式,
        getImageUrl(url) {
            if(url == null){
                return ''
            }
            if (url.startsWith('http://localhost'))
                return url
            else
                // 在线地址
                return 'https://images.weserv.nl/?url=' + 'http:' + url
        },
        beforeUpload(file) {
            const isIMG = /.(jpg|jpeg|png|JPG|PNG)$/.test(file.name);
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isIMG) {
                this.$message.error('上传头像图片只能是图片格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isIMG && isLt2M;
        }
    },
    //直接把mapState mixin进去
    computed: {
        ...mapGetters(['uid', 'phone']),
    },
};
export default mixin;
