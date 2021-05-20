<template>
    <div class="comp-myform">
        <el-form    ref="elForm" 
                    status-icon 
                    v-loading="loading"
                    element-loading-spinner="el-icon-loading" 
                    :model="model" 
                    :rules="rules" 
                    :label-width="_labelWidth"
                    :element-loading-text="loadingText" 
                    @submit.native.prevent>

            <el-form-item   v-for="(item, index) in formItems.filter(item => !item.isHidden)" 
                            :key="index"
                            :label="item.label" 
                            :prop="item.name">

                <item-render    :item="item" 
                                :model="model" 
                                :modelArray="model[item.name]" 
                                :headers="item.arrayList" 
                                :operDisabled="item.operDisabled">
                    <slot :name="item.name"></slot>
                </item-render>
                
            </el-form-item>

            <div class="other-box" :style="pdl">
                <slot name="other"></slot>
            </div>

            <div class="confirm-btns" :style="pdl">
                <slot name="btns">
                    <el-button type="danger" @click="onCancel">取消</el-button>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                </slot>
            </div>
        </el-form>
    </div>
</template>

<script>
import ItemRender from "./ItemRender"
import { debounce } from "common/utils/util"

export default {
    props: {
        model: {
            required: true,
            type: Object,
        },
        formItems: {
            required: true,
            type: Array,
        },
        rules: {
            type: Object,
            default: () => { }
        },
        labelWidth: {
            type: Number,
            default: () => 100
        },
        loading: {
            type: Boolean,
            default: false
        },
        loadingText: {
            default: '正在提交中'
        }
    },
    methods: {
        //提交
        onSubmit (btn) {
            this.submit(btn)
        },
        validate () {
            return new Promise((resolve, reject) => {
                this.$refs.elForm.validate(flag => {
                    resolve(flag)
                })
            })
        },
        _submit (btn) {
            this.validate().then(flag => {
                if (flag) {
                    this.$emit('handleSubmit', btn || '')
                }
            })
        },
        onCancel () {
            this.$parent.hide && this.$parent.hide()
            this.$emit('onCancel')
        },
        clear () {
            this.clearValidate()
            this.$refs.elForm.resetFields()
        },
        clearValidate (str) {
            this.$refs.elForm.clearValidate(str)
        },
        validateField (str) {
            this.$refs.elForm.validateField(str)
        },
        getStyle (width) {
            let style = ""
            if (!width) {
                style = "width:100%"
            } else {
                style = parseInt(this.getCurrentPx(width)) + 'px'
            }
            return style
        },
    },
    computed: {
        _labelWidth () {
            //四个字在1366 最小宽度 90
            let width = this.labelWidth
            return width + 'px'
        },
        pdl () {
            return `paddingLeft:${this._labelWidth}`
        }
    },
    created () {
        //定义函数时候，就要定义成防抖函数
        this.submit = debounce(this._submit)
    },
    components: {
        ItemRender
    },
}
</script>

<style lang="less" scoped>
.comp-myform {
    /deep/ .el-select {
        width: 100%;
    }
    /deep/ .el-date-editor {
        width: 100%;
    }
    /deep/ .el-cascader {
        width: 100%;
    }
}
/deep/ .el-form {
    .el-form-item.is-success .el-input__inner {
        border-color: none;
    }
}
.other-box {
    margin-bottom: 20px;
}
</style>