<template>
    <div class="import-container">
        <el-scrollbar class="scrollbar" ref="scrollbar">
            <div class="upload">
                <div class="info" v-if="importFile">
                    <span>文件：{{importFile.name}}</span>
                    <span>大小：{{formatSize(importFile.size)}}</span>
                    <span>状态：{{getStatus(importFile.status)}}</span>
                    <span>
                        <el-button size="mini" icon="el-icon-close" @click="importFile=null">取消</el-button>
                    </span>
                </div>
                <el-upload v-else drag action="" :auto-upload="false" :show-file-list="false" accept=".xlsx,.xls" :on-change="changeFile">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">只能上传xl/png文件，且不超过500kb</div>
                </el-upload>
            </div>
            <div class="lists">
                <div class="content">
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item name="base">
                            <template slot="title">
                                <i class="el-icon-connection" />
                                <span>基本信息</span>
                            </template>
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </el-collapse-item>
                        <el-collapse-item name="2">
                            <template slot="title">
                                <i class="el-icon-connection" />
                                <span>公司任职信息</span>
                            </template>
                            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                        </el-collapse-item>
                        <el-collapse-item name="3">
                            <template slot="title">
                                <i class="el-icon-connection" />
                                <span>学历学位信息</span>
                            </template>
                            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                        </el-collapse-item>
                        <el-collapse-item name="4">
                            <template slot="title">
                                <i class="el-icon-connection" />
                                <span>社会工作经历</span>
                            </template>
                            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                        </el-collapse-item>
                        <el-collapse-item name="5">
                            <template slot="title">
                                <i class="el-icon-connection" />
                                <span>家庭成员及主要社会关系</span>
                            </template>
                            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <div class="btns">
                    <el-button size="mini" type="primary" :icon="loading?'el-icon-loading':'el-icon-coin'" @click="saveImport" :disabled="loading">提交保存</el-button>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
<script>
import XLSX from 'xlsx'
const statusArr = { 'ready': '准备上传', 'progress': '上传中', 'error': '上传失败', 'success': '上传成功' };

const fields = { 'base': { 'name': '基本信息' }, 'office': { 'name': '公司任职信息' } };
export default {
    name: "import-form",
    data: () => ({
        activeNames: "base",
        importFile: null,
        loading: false,
        outputs: []
    }),
    methods: {
        formatSize(bytes) {
            if (bytes === 0) return '0 B';
            let k = 1024,
                sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));
            return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
        },
        getStatus(type) {
            return statusArr[type];
        },
        handleChange(val) {
            console.log('handleChange', val)
        },
        changeFile(file) {
            this.importFile = file;
            console.log('file', file);
            //const files = file.raw;
            const fileReader = new FileReader();
            this.outputs = [];
            /* fileReader.onload = (ev) => {
                try {
                    const data = ev.target.result;
                    const workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                    for (let k = 0; k < workbook.SheetNames.length; k++) {
                        const wsname = workbook.SheetNames[k];                          // 取sheet名称
                        const sheetKeyObj = xlxsKeys[wsname];                           // 取对应的数据键值对
                        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);   // 生成json表格内容
                        console.log(ws);
                        let list = {
                            "field": _.findKey(fields, { "name": wsname }), //sheetKeyObj['fieldName'],
                            "data": []
                        }
                        list.data = ws.map(item => {
                            let keysArr = Object.keys(item);
                            let valuesArr = Object.values(item);
                            let obj = {};
                            for (let i = 0; i < keysArr.length; i++) {
                                let key = sheetKeyObj[keysArr[i]];
                                if (key) {
                                    obj[key] = valuesArr[i];
                                }
                            }
                            return obj;
                        });
                        this.outputs.push(list);
                    }
                    console.log('this.outputs', this.outputs);
                } catch (e) {
                    return false;
                }
            };
            fileReader.readAsBinaryString(file.raw); */
        },
        saveImport() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 3000)
        }
    },
    mounted() {

    }
}
</script>
<style lang="scss" scoped>
.import-container {
	padding: 0 15px;
	box-sizing: border-box;
	height: 100%;
	overflow: hidden;
	.scrollbar {
		width: 100%;
		height: 100%;
		/deep/ .el-scrollbar__wrap {
			overflow-x: hidden;
		}
	}

	.upload {
		margin-bottom: 20px;
		.info {
			> span {
				margin: 0 5px;
			}
		}
	}
	.lists {
		.content {
			height: calc(100% - 45px);
			/deep/ .el-collapse {
				.el-collapse-item__header {
					> i {
						margin-right: 10px;
					}
				}
			}
		}
		.btns {
			height: 45px;
			display: flex;
			align-items: center;
		}
	}
}
</style>

