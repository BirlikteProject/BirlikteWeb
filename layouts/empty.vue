<template>
    <div class="empty-layout">
        <nuxt />
    </div>
</template>

<script>
export default {
name: 'EmptyLayout',
}
</script>
<style lang="scss">
.empty-layout {
    min-height: 100vh;
    width: 100%;
    background-color: white;
}
</style>
