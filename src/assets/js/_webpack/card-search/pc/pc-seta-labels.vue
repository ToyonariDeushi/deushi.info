<template>
    <div>
        <div v-if="formModel=='pokemon'">
            ポケモンの条件
        </div>
        <div v-else-if="formModel=='trainer'">
            トレーナーズの条件
        </div>
        <div v-else-if="formModel=='energy'">
            エネルギーの条件
        </div>
    </div>
</template>
<script>
    export default {
        props: ['model'],
        data() {
            return {
                formModel: this.model
            }
        },
    }
</script>