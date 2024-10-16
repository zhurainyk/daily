<template>

	<view class="circletitle">
		<view class="circle"></view>
		<view class="title">{{_title}}</view>
	</view>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue'
const props = defineProps({
	title: {
		type: String,
		default: '1.困梯'
	}
})
const _title = computed(() => {
	return props.title
})
</script>

<style lang="scss">
.circletitle {
	width: 100%;
	height: 25px;

	text-align: center;
	margin: auto;

	display: flex;
	justify-content: center;
	align-items: center;

	.circle {
		background: radial-gradient(3px, #6427DE, 4px, #2B1E8E);
		width: 18px;
		height: 18px;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 10px;
		z-index: 2;
	}

	.title {
		color: #fff;
		font-size: 25px;
	}
}
</style>