<template>
    <border class="border">
        <div class="temp">
            <module-name :moduleName="'昨日超期'"></module-name>
            <div class="content">
                <div class="tab">
                    <div class="item">
                        <div class="label">维保计划超期</div>
                        <div class="value">5</div>
                    </div>
                    <div class="item">
                        <div class="label">维保超期</div>
                        <div class="value">5</div>
                    </div>
                    <div class="item">
                        <div class="label">回召转派超期</div>
                        <div class="value">5</div>
                    </div>
                    <div class="item">
                        <div class="label">回召超期</div>
                        <div class="value">5</div>
                    </div>
                    <div class="item">
                        <div class="label">巡查超期</div>
                        <div class="value">5</div>
                    </div>
                </div>
                <div class="tab">
                    <div class="item">
                        <div class="label">超期率</div>
                        <div class="value">5%</div>
                    </div>
                    <div class="item">
                        <div class="label">超期率</div>
                        <div class="value">5%</div>
                    </div>
                    <div class="item">
                        <div class="label">超期率</div>
                        <div class="value">5%</div>
                    </div>
                    <div class="item">
                        <div class="label">超期率</div>
                        <div class="value">5%</div>
                    </div>
                    <div class="item">
                        <div class="label">超期率</div>
                        <div class="value">5%</div>
                    </div>
                </div>
            </div>
        </div>
    </border>
</template>
<script setup>

</script>
<style lang="scss" scoped>
.border {
    width: 100%;
    height: 100%;

    .temp {
        position: relative;

        .sub-title {
            position: absolute;
            top: 17px;
            left: 108px;
            font-size: 14px;
            color: #23FFFC;
        }

        .content {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;

            .tab {
                position: relative;
                width: 50%;
                box-sizing: border-box;
                padding: 0 10px;

                .item {
                    margin: 10px 0;
                    text-align: center;

                    .label {
                        font-size: 14px;
                        color: #fff;
                        white-space: nowrap;
                    }

                    .value {
                        font-size: 22px;
                        color: #29B6FF;
                    }
                }
            }

            // .tab:first-child::after {
            //     content: '';
            //     position: absolute;
            //     right: 0;
            //     top: 0;
            //     width: 1px;
            //     height: 100%;
            //     background-color: rgba(0, 154, 252, .3);
            // }
        }
    }

}
</style>