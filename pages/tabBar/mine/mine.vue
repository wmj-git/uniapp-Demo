<template>
	<view class="uni-container">
		<view class="upload">
			<button @click="upload">选择图片上传</button>
		</view>
		<view class="uni-panel" v-for="(item, index) in list" :key="item.id">
			<view class="uni-panel-h" :class="item.open ? 'uni-panel-h-on' : ''" @click="triggerCollapse(index)">
				<text class="uni-panel-text">{{item.name}}</text>
				<text class="uni-panel-icon uni-icon" :class="item.open ? 'uni-panel-icon-on' : ''">{{item.pages ? '&#xe581;' : '&#xe470;'}}</text>
			</view>
			<view class="uni-panel-c" v-if="item.open">
				<view class="uni-navigate-item" v-for="(item2,key) in item.pages" :key="key" :url="item.url" @click="goDetailPage(item2.url)">
					<text class="uni-navigate-text">{{item2.name ? item2.name : item2}}</text>
					<text class="uni-navigate-icon uni-icon">&#xe470;</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		http
	} from '../../../common/service.js'
	export default {
		data() {
			const list = [{
				id: 'page',
				name: '地图操作',
				open: false,
				pages: [{
						name: '获取当前位置',
						url: 'get-location'
					},
					{
						name: '使用地图查看位置',
						url: 'open-location'
					},
					// #ifndef MP-TOUTIAO
					{
						name: '使用地图选择位置',
						url: 'choose-location'
					}
					// #endif
					,
					// #ifndef MP-QQ || MP-TOUTIAO
					{
						name: '地图控制',
						url: 'map'
					}
					// #endif
				],
			}];
			return {
				title: 'uploadFile',
				imageSrc: '',
				list: list

			}
		},
		onUnload() {
			this.imageSrc = '';
		},
		methods: {
			triggerCollapse(e) {
				if (!this.list[e].pages) {
					this.goDetailPage(this.list[e].url);
					return;
				}
				for (var i = 0; i < this.list.length; ++i) {
					if (e === i) {
						this.list[i].open = !this.list[e].open;
					} else {
						this.list[i].open = false;
					}
				}
			},
			upload() {
				let that = this;
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(res);
						http
							.upload('/api/upload/img', {
								filePath: res.tempFilePaths[0],
								name: 'file'
							})
							.then(res => {
								console.log('全局http 上传 get success----');
								console.log(res);
							})
							.catch(err => {
								console.log('全局http 上传 fail----');
								console.log(err);
							});
					}
				});
			},
			goDetailPage(path) {
				console.log('path:', path);
				if (this.navigateFlag) {
					return;
				}
				this.navigateFlag = true;
				uni.navigateTo({
					url: '/pages/view/' + path + '/' + path
				});
				setTimeout(() => {
					this.navigateFlag = false;
				}, 200)
			}
		}
	}
</script>

<style>
	@import '../../../common/style/uni-nvue.css';

	.uni-panel-h,.uni-navigate-item {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-shrink: 0;
		flex-shrink: 0;
		-webkit-box-flex: 0;
		-webkit-flex-grow: 0;
		flex-grow: 0;
		-webkit-flex-basis: auto;
		flex-basis: auto;
		-webkit-align-content: flex-start;
		align-content: flex-start;
	}
	.upload{
		margin-bottom: 15rpx;
	}
</style>
