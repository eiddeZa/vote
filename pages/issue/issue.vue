<template>
	<view>
		<u-tabbar :list="tabs" :mid-button="true" active-color="#f47347"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs:""
			}
		},
		onLoad() {
			this.tabs=this.$store.state.tabbarList;
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
