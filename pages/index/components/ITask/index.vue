<template>
  <view
    class="card"
    style="margin-top: 12px; padding-bottom: 12px; background-color: white;"
  >
    <view style="padding: 12px 0">当日任务</view>

    <view class="recycle-task text-left">
      <uni-collapse>
        <uni-collapse-item
          v-for="task in tasks"
          :key="task.time"
          :title="task.time + ' · ' + task.employer"
          :show-animation="true"
        >
          <view
            class="flex justify-between align-center"
            style="padding: 0 14px;"
          >
            <view class="address text-ellipsis" style="color: #888">
              {{ task.address }}
            </view>
            <view class="icons-operation flex justify-between align-center">
              <text
                v-for="item in task.icons"
                :key="item.icon"
                class="p-1 pl-2 iconfont"
                :class="item.icon"
                :style="{
                  color: item.color,
                  'font-size': '18px'
                }"
                @click="taskIconClick(task.id, item.key)"
              />
            </view>
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ITask',
  props: {
    tasks: {
      type: Array,
      default: () => []
    },
    taskIconClick: {
      type: Function,
      default: () => () => console.log('taskIconClick')
    }
  }
};
</script>

<style></style>
