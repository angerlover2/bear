<template>
	<div id="app2">
		<mt-search></mt-search>
		<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
		<mt-loadmore  v-bind:bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmorea" @bottom-status-change="handleBottomChange">
			<div class="news-wrap" v-for="(item,index) in news" v-if="index < page">
				<h3>{{ item.titles }}</h3>
				<div class="info">
					<div class="fl"><span id="author" v-text="item.authors"> </span><span class="tips" v-text="item.tips"></span></div>
					<div class="fr"><span id="pubDate"> {{ item.pubDates|timeStr }} </span></div>
				</div>
				<div class="contnet">
					<a :href="item.links" class="fl text" >{{ item.descriptions|strCut }}</a>
					<div class="fr pic"><img v-bind:src="item.imgSrcs?item.imgSrcs:'http://img2.imgtn.bdimg.com/it/u=170685180,3949810478&fm=23&gp=0.jpg'" alt="" /></div>
				</div>
			</div>
			<div slot="bottom" class="mint-loadmore-bottom">
		      <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">加载中……</span>
		      <span v-show="bottomStatus === 'loading'">
	            <mt-spinner type="snake"></mt-spinner>
	          </span>
		    </div>
		</mt-loadmore>
		</div>
	</div>
</template>

<script>

	export default {
		data() {
				return{
					news:[],
					page:0,
					totalNum:0,
					allLoaded:false,
					bottomStatus:'',
					wrapperHeight: 0
				};
		},
		methods: {
			getData: function() {
				var that = this;
				$.ajax({

					url: 'static/1.xml',
					success: function(data) {
						var news=[];
						$(data).find("channel").find("item").each(function(index, ele) {
							that.totalNum += $(ele).find("title").length;
							var title=$(ele).find("title").text();
							var author=$(ele).find("author").text();
							var tip=$(ele).find("category").text();
							var description=$(ele).find("description").text();
							var pubDate=$(ele).find("pubDate").text();
							var linka=$(ele).find("link").text();
							var imgSrchtml=$(ele).find("description").text();/*获取新闻描述内容*/
							var imgSrc=$(imgSrchtml).children("img")[0];/*从新闻描述中取出第一个img*/
							var imgSrc2= $(imgSrc).attr("src");/*取出img地址*/
							news.push({
				                titles: title,
				                authors: author,
				                tips: tip,
				                descriptions: description,
				                pubDates: pubDate,
				                links: linka,
				                imgSrcs:imgSrc2
				           });
						});
						that.news=news;
						console.log("共" + that.totalNum + "条数据");
					}
				});
			},
			handleBottomChange:function(status){
				this.bottomStatus = status;
			},
			loadBottom: function(id) {
				var _this=this;
				_this.page+=10;
			  	setTimeout(() => {
				    if(_this.page>(_this.totalNum)){
				    	_this.allLoaded = true;// 若数据已全部获取完毕
				    }
				    this.$refs.loadmorea.onBottomLoaded();
				}, 1500);
				
			}	
		},
		mounted: function() {
			this.getData();
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		}
    
			
	};
	
	
	
</script>

<style>

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
	
	.fl {
		float: left;
	}
	
	.fr {
		float: right;
	}
	
	#app2 .mint-search {
		height: auto;
	}
	
	.news-wrap {
		border-bottom: 1px solid #f6f6f6;
		padding: 0 1%;
	}
	
	.info {
		overflow: hidden;
	}
	
	.info span {
		display: inline-block;
		padding: 1px 3px;
		font-size: 12px;
		margin: 0 5px 0 0;
	}
	
	#author {
		color: #fff;
		background: #5090C6;
	}
	
	.tips {
		background: #F1F1F1;
		color: #E8A7A2;
	}
	
	#pubDate {
		background: #999;
		color: #fff;
	}
	
	.contnet {
		padding: 2% 0;
		overflow: hidden;
		font-size: 12px;
	}
	
	.contnet .text {
		width: calc(100% - 120px);
		line-height: 180%;
		text-align: left;
		color:#000;
		text-decoration: none;
	}
	
	.contnet .pic {
		width: 100px;
		height: 100px;
	}
	
	.contnet .pic img {
		width: 100px;
		height: 100px;
	}
</style>