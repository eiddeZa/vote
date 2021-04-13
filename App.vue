<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "static/css/main.css";
	@import "static/css/icon.css";
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	page{
		height: 100%;
	}
</style>
