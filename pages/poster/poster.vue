<template>
	<view>
		<mosowe-canvas-image ref="mosoweCanvasComponents" @canvasImage="_canvasImage" :lists="lists" height="300"
			width="300" showPreview />
		<image :src="canvasUrl" mode="widthFix"></image>
	</view>
</template>

<script>
import mosoweCanvasImage from "@/components/mosowe-canvas-image/mosowe-canvas-image.vue"
	export default {
		components: {
			mosoweCanvasImage
		},
		data() {
			return {
				banner:"",
				canvasUrl: '',
				lists: [{
						type: 'image',
						content: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=141893613,1543416398&fm=11&gp=0.jpg',
						width: 375,
						height: 500,
					},
					{
						type: 'qr',
						content: "",
						width: 80,
						height: 80,
						x: 20,
						y: 200,
						arc: false,
						arcX: 0,
						arcY: 0,
						arcR: 0
					},
					{
						type: 'text',
						content: '扫一扫，为我投票吧！',
						x: 120,
						y: 250,
						color: '#ff0000',
						size: 10,
						// maxWidth: 100, 
						// align: 'left', 
					},
			
				]
			}
		},
		//分享给朋友
		onShareAppMessage(res) {
			return {
				title: this.banner.title,
				path: this.getUrl(),
				success: res => {
					console.info(res)
				}
			}
		},
		//分享到朋友圈
		onShareTimeline(res) {
			return {
				title: "迅投，快来投票吧！",
				query: this.getUrl(),
			}
		},
		onLoad(event) {
			// TODO 后面把参数名替换成 payload
			const payload = event.obj || event.payload;
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.banner = JSON.parse(decodeURIComponent(payload));
			} catch (error) {
				this.banner = JSON.parse(payload);
			}
			this.lists[1].content=this.banner;
			this.$nextTick(()=>{
					this.$refs.mosoweCanvasComponents.createCanvas();
			})
			console.log(payload)
		},
		methods: {
			_canvasImage(e) {
				this.canvasUrl = e;
			},
			getUrl(){
				
			}
		}
	}
</script>

<style>

</style>
