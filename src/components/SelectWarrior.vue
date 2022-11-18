<template>
    <div class="vh-100 d-flex justify-content-center align-items-center">
        <div class="w-75 h-75">
            <div class="row text-center">
                <div class="col-sm-12">
                    <h5 class="text-warning fs-1 fw-bold"><router-link to="/" class="text-decoration-none text-warning">&lt;</router-link>&nbsp;TANGATA TOA</h5>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-6 col-sm-5 col-9 text-center mt-5" v-for="(image, index) in imagesPath" :key="index">
                    <img @click="setImagePath($event)" :src="require('../assets/avatar_' + image + '.jpg')"
                        width="140px" height="140px" class="rounded-circle">
                </div>
                <div class="col-lg-6 col-sm-5 col-9 text-center mt-5">
                    <img src="@/assets/avatar_unknown.jpg" @click="setImagePath('random')" width="140px" height="140px"
                        class="rounded-circle border border-3 border-dark bg-light">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            imagesPath: ['marvin', 'dragon', 'tesla', 'hackerman', 'unicorn']
        }
    },
    methods: {
        setImagePath(event) {
            if (event == 'random') {
                localStorage.setItem("selectedWarrior", this.imagesPath[Math.floor(Math.random() * 5)])
            } else {
                let imagePath = event.path[0].currentSrc.slice(event.path[0].currentSrc.indexOf("_") + 1, event.path[0].currentSrc.indexOf("."))
                localStorage.setItem("selectedWarrior", imagePath)
            }
            this.$router.replace("/")
        }
    },
}
</script>

