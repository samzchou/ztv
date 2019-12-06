<template>
    <section class="file-container">
        <div class="box">
            <div class="left" id="box-left" :style="{'width':leftWidth+'px'}">
                <div class="root">
                    <div>文档目录</div>
                    <div v-if="checkRoles(2)">
                        <el-button class="icon-link" icon="el-icon-plus" @click="addDir(null)" />
                    </div>
                </div>
                <div class="tree-content">
                    <el-scrollbar class="scrollbar">
                        <client-only>
                            <el-tree ref="tree" :data="treeData" node-key="id" default-expand-all highlight-current :expand-on-click-node="false" :props="defaultProps" @node-click="nodeClick" empty-text="暂无文档目录数据，请添加">
                                <div class="custom-tree-node" slot-scope="{ node, data }">
                                    <!--编辑名称-->
                                    <div v-if="editNode && editNode.id == data.id" class="edits">
                                        <input type="text" v-model="editNode.name" @click.stop="return false" />
                                        <div class="btns">
                                            <i class="el-icon-check" @click.stop.prevent="updateNode" />
                                            <i class="el-icon-close" @click.stop.prevent="editNode=null" />
                                        </div>
                                    </div>
                                    <div v-else class="node-folder" :class="{'active':currNode&&currNode.id==data.id}">{{ node.label }}</div>
                                    <div class="btns" v-if="checkRoles(2)">
                                        <el-button class="icon-link" title="编辑目录名称" size="mini" @click.stop.prevent="() => editTree(data)" icon="el-icon-edit" />
                                        <el-button class="icon-link" title="添加下级目录" size="mini" @click.stop.prevent="() => addDir(data)" icon="el-icon-plus" />
                                        <el-button class="icon-link" title="删除目录" size="mini" @click.stop.prevent="() => removeTree(node, data)" icon="el-icon-delete" />
                                    </div>
                                </div>
                            </el-tree>
                        </client-only>
                    </el-scrollbar>
                </div>
            </div>
            <div class="resize" @mousedown="handlerMouseDown"></div>
            <!--中间部分-->
            <div class="mid" id="box-mid">
                <div class="forms" v-if="isAddForm">
                    <div class="title">{{formTitle}}</div>
                    <sam-form ref="editform" :data="catForm" :isEdit="false" v-model="catValue" />
                    <div class="submit">
                        <el-button size="mini" type="primary" @click="submitForm(null)">提交保存</el-button>
                        <el-button size="mini" @click="isAddForm=false">返回</el-button>
                    </div>
                </div>
                <div v-else class="files-list">
                    <div class="lists" v-if="!isAddFile">
                        <div class="title">
                            <div class="left">
                                <div>【{{currNode?currNode.name:'根目录'}}】文档列表</div>
                                <div class="form">
                                    <el-form size="small" :inline="true" :model="searchForm">
                                        <el-form-item>
                                            <el-input v-model="searchForm.d_title" placeholder="按文档名" clearable style="width:150px" />
                                        </el-form-item>
                                        <el-form-item>
                                            <el-input v-model="searchForm.d_docname" placeholder="按文档后缀" clearable style="width:150px" />
                                        </el-form-item>
                                        <el-form-item>
                                            <el-select v-model="searchForm.d_grade" placeholder="按文档密级" clearable style="width:150px">
                                                <el-option v-for="item in gradeArr" :key="item.value" :label="item.label" :value="item.value" />
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="success" @click="onSubmitSearch">查询</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                            <div>
                                <el-button v-if="checkRoles(2)" size="small" icon="el-icon-folder-opened" @click="addDir(currNode)">新增目录</el-button>
                                <el-button v-if="checkRoles(2)" type="primary" size="small" icon="el-icon-document" @click="startUpload">上传文档</el-button>
                                <el-button v-if="checkRoles(5)" type="warning" size="small" icon="el-icon-delete" @click="handleBatchCommand('remove')">批量删除</el-button>
                                <!-- <el-dropdown @command="handleBatchCommand">
                                    <el-button size="mini" type="warning">
                                        批量处理<i class="el-icon-arrow-down el-icon--right"></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="share">批量共享</el-dropdown-item>
                                        <el-dropdown-item command="remove">批量删除</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown> -->
                            </div>
                        </div>
                        <div class="file-content">
                            <!-- <el-scrollbar class="scrollbar"> -->
                            <ul class="lists">
                                <!--目录列表-->
                                <li v-for="node in childrenList" :key="`f-${node.id}`" @click="setCurrNode(node)">
                                    <div class="content">
                                        <div class="icon" :style="{'background-image':`url(/images/icons/${setFolder(node)}.png)`}">
                                            <span style="font-size:16px;">文档目录</span>
                                        </div>
                                        <div class="desc">
                                            <span>{{node.name}}</span>
                                        </div>
                                    </div>
                                </li>
                                <!--文档列表 v-contextmenu="menu" -->
                                <li v-for="file in docList" :key="file.id" @click="setCurrDoc(file, $event)">
                                    <div class="content">
                                        <div class="icon" :style="{'background-image':`url(/images/icons/${getExt(file.d_docname)}.png)`}">
                                            <span v-if="getExt(file.d_docname)=='common'">{{getExtName(file.d_docname)}}</span>
                                        </div>
                                        <div class="desc">
                                            <span>{{file.d_title}}</span>
                                        </div>
                                    </div>
                                    <div class="btns">
                                        <el-button class="icon-link" icon="el-icon-download" @click.stop="clickBtn(file, 'downloadFn')">下载</el-button>
                                        <el-button class="icon-link" v-if="checkIsView(file)" icon="el-icon-view" @click.stop="clickBtn(file, 'viewFn')">预览</el-button>
                                        <el-button v-if="checkRoles(2)" class="icon-link" icon="el-icon-edit" @click.stop="clickBtn(file, 'editFn')">详情</el-button>
                                        <el-button v-if="checkRoles(2)" class="icon-link" icon="el-icon-delete" @click.stop="clickBtn(file, 'deleteFn')">删除</el-button>
                                    </div>
                                    <div class="checkbox">
                                        <el-checkbox size="medium" :checked="getCheckedDoc(file.id)" @change="setCheckedDoc(file.id)" />
                                    </div>
                                    <div class="grade" :title="`文档密级:${file.d_grade}`">{{file.d_grade}}</div>
                                </li>
                            </ul>
                            <!-- </el-scrollbar> -->
                        </div>
                    </div>
                    <!--文档上传 uploadForm-->
                    <div v-else class="uploads">
                        <div class="title">
                            <sam-form ref="uploadform" :data="uploadForm" :isEdit="false" v-model="uploadValue" />
                            <div>
                                <el-button v-if="uploadList.length" size="mini" type="primary" @click="submitUpload">提交上传</el-button>
                                <el-button v-if="uploadList.length" size="mini" @click="resetUpload">{{uploadList.length?'重新上传':'上传文档'}}</el-button>
                                <el-button size="mini" type="info" @click="isAddFile=false">取消返回</el-button>
                            </div>
                        </div>
                        <div v-if="uploadList.length" class="file-content">
                            <!-- <el-scrollbar class="scrollbar"> -->
                            <ul class="lists">
                                <li v-for="(pic,idx) in picList" :key="idx">
                                    <div class="content">
                                        <div class="icon" :style="{'background-image':`url(/images/icons/${getExt(pic.name)}.png)`}">
                                            <span v-if="getExt(pic.name)=='common'">{{getExtName(pic.name)}}</span>
                                        </div>
                                        <div class="desc">
                                            <span>{{pic.name}}</span>
                                        </div>
                                    </div>
                                    <div class="remove" title="移除" @click="removeFileItem(idx)">
                                        <i class="el-icon-delete" />
                                    </div>
                                </li>
                            </ul>
                            <!--  </el-scrollbar> -->
                        </div>
                        <div v-else class="upload-comp">
                            <el-upload ref="uploadFile" drag multiple action="" :auto-upload="false" :show-file-list="false" :on-change="uploadChange">
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文档拖到此处，或<el-button id="updalodBtn" slot="trigger" type="text">点击上传</el-button>
                                </div>
                                <!-- <div class="el-upload__tip" slot="tip">上传的文档不超过1M</div> -->
                            </el-upload>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--弹窗信息-->
        <el-dialog title="文档信息" append-to-body close-on-press-escape :visible.sync="visbleDoc" :close-on-click-modal="false" width="80%">
            <div class="doc-info">
                <el-table v-if="!isEdit" size="small" border :data="docData" style="width:100%">
                    <el-table-column v-for="field in docFields.itemList" :key="field.name" :label="field.label" :width="field.width?field.width:'auto'">
                        <template slot-scope="scope">
                            <span>{{getStr(scope.row, field.name)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="编辑" width="80">
                        <template slot-scope="scope">
                            <el-button class="icon-link" icon="el-icon-edit" @click="isEdit=true">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div v-else>
                    <sam-form ref="docinfoform" :data="docFields" :isEdit="false" v-model="docformValue" />
                    <div>
                        <el-button size="small" type="primary" @click="updateDocinfo">提交保存</el-button>
                        <el-button size="small" @click="isEdit=false">取消</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
        <div class="doc-btns" id="doc-btns" :style="btnStyle">
            <el-button-group>
                <el-button size="mini" type="primary" icon="el-icon-download" title="下载"></el-button>
                <el-button size="mini" type="primary" icon="el-icon-view" title="预览"></el-button>
                <el-button size="mini" type="primary" icon="el-icon-edit" title="编辑"></el-button>
                <el-button size="mini" type="primary" icon="el-icon-document-copy" title="复制"></el-button>
                <el-button size="mini" type="primary" icon="el-icon-scissors" title="剪切"></el-button>
                <el-button size="mini" type="primary" icon="el-icon-delete" title="删除"></el-button>
            </el-button-group>
        </div>

        <div class="view-doc" v-show="visiblePdf">
            <pdf-view ref="pdf-view" :visible="visiblePdf" :pdfUrl="pdfParams.pdfUrl" :fullPage="pdfParams.fullPage" type="stream" @close="visiblePdf=false" />
        </div>

    </section>
</template>

<script>
import samForm from '~/components/form';
import dataUtil from '~/util/data_util';
import axios from 'axios';
import docform from './forms';
import pdfView from '~/components/pdfview';
export default {
    name: 'files',
    components: {
        samForm, pdfView
    },
    props: {
        doctype: {
            type: String,
            default: "user"
        }
    },
    computed: {
        // 右键菜单
        menu() {
            return [{
                icon: 'el-icon-download',
                name: '下载文档',
                fn: this.downloadFn
            }, {
                icon: 'el-icon-edit',
                name: '文档信息',
                fn: this.editFn
            }, {
                icon: 'el-icon-delete',
                name: '删除文档',
                fn: this.deleteFn
            }]
        },

    },
    watch: {
        doctype(val) {
            //console.log('watch doctype', val);
            this.currNode = null;
            this.isAddForm = false;
            this.isAddFile = false;
            this.uploadList = [];
            this.picList = [];
            this.checkedDocList = [];

            this.getTreeList();
        }
    },
    data: () => ({
        loadingMask: null,
        dragging: false,
        leftWidth: 300,
        selectOrg: {
            orgsid: []
        },
        sourceData: [],
        treeData: [],
        docList: [],         // 文档列表
        sourceDocData: [],
        childrenList: [],
        defaultProps: {
            children: 'children',
            label: 'name'
        },
        isAddForm: false,
        formTitle: "",
        catForm: { ...docform.catForm },
        catValue: { ...docform.catValue },
        uploadForm: { ...docform.uploadForm },
        uploadValue: { ...docform.uploadValue },
        searchForm: {
            d_title: "",
            d_docname: "",
            d_grade: ""
        },
        gradeArr: [...docform.gradeArr],
        currNode: null,
        editNode: null,
        isAddFile: false,
        uploadList: [],
        picList: [],
        loadingUpload: false,
        uploadCompleted: false,
        fieldItemData: {},   // 数据字段对应的值集
        currDoc: null,
        visbleDoc: false,
        docData: [],
        docFields: { ...docform.docFields },
        checkedDocList: [], // 选中的文档ID
        docformValue: {},
        isEdit: false,
        myRoles: [],// 用户权限
        visiblePdf: false,
        pdfParams: {
            pdfUrl: "",
            fullPage: false
        },
        btnStyle: {
            left: '400px',
            top: '400px'
        }
    }),
    methods: {
        /* getMyRoles() {
            let roles = _.find(this.$store.state.collectionData.roles, { "id": this.$store.state.user.roles });
            this.myRoles = roles.content.filter(item => {
                return item.id == this.$store.state.currpage.id;
            });
            console.log('getMyRoles', roles, this.myRoles)
        }, */
        // 校验是否可以预览
        checkIsView(file) {
            let ext = this.$global.getExt(file.d_docname).toLocaleLowerCase();
            return ['pdf'].includes(ext);
        },
        checkRoles(val) {
            let roles = _.find(this.$store.state.collectionData.roles, { "id": this.$store.state.user.roles });
            roles = roles.content.filter(item => {
                return item.id == this.$store.state.currpage.id;
            });

            let index = _.findIndex(roles, { "value": val });
            //console.log('this.myRoles', roles, index);
            if (this.doctype == "user") {
                return true;
            } else if (this.doctype == "department") {
                let dept = this.$storage.session.get("dept");
                if (dept) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return !!~index;
            }

        },
        setFolder(item) {
            if (item.children && item.children.length) {
                return 'folder';
            }
            return 'empty-folder';
        },
        setCheckedDoc(id) {
            //console.log('setCheckedDoc', id);
            if (!this.checkedDocList.includes(id)) {
                this.checkedDocList.push(id);
            } else {
                for (let i = 0; i < this.checkedDocList.length; i++) {
                    if (this.checkedDocList[i] == id) {
                        this.checkedDocList.splice(i, 1);
                    }
                }
            }
        },
        getCheckedDoc(id) {
            return this.checkedDocList.includes(id);
        },
        // 批量处理
        handleBatchCommand(cmd) {
            if (!this.checkedDocList.length) {
                this.$alert("请勾选需要处理的文档！")
                return;
            }
            //console.log('handleBatchCommand', this.checkedDocList, cmd)
            if (cmd == "remove") {
                this.deleteFn(null, this.checkedDocList)
            }
        },

        // 更新文档内容 docinfoform
        updateDocinfo() {
            //console.log('docformValue', this.docformValue)
            let refForm = this.$refs['docinfoform'];
            let isValidate = refForm.checkFormValidate();
            if (!isValidate) {
                this.$message.error('表单数据的验证有误，请核查！');
                return;
            }
            let data = {};
            this.docFields.itemList.forEach(item => {
                let key = item.name;
                let value = dataUtil.checkValue(item.type, this.docformValue[item.key]);
                data[key] = value;
            });
            //console.log('updateDocinfo', data);
            let dff = this.$global.difference(data, this.currDoc);
            dff.id = this.currDoc.id;
            data.id = this.currDoc.id;
            let condition = {
                "collectionName": "docinfo",
                "type": "updateData",
                "data": dff
            };
            //console.log('condition', condition);
            this.$axios.$post('mock/db', { "data": condition }).then(result => {
                if (result) {
                    this.$message("数据已提交保存");
                    //debugger
                    this.currDoc = _.merge(this.currDoc, data);//_.Object.assign({}, this.currDoc, data);
                    this.docData = [data];
                    let index = _.findIndex(this.docList, { "id": this.currDoc.id });
                    this.$set(this.docList, index, this.currDoc);
                    console.log('docList', this.docList)
                    this.isEdit = false;
                } else {
                    this.$alert("数据保存失败！")
                }
            });

        },
        // 设置显示值
        getStr(row, field) {
            let str = row[field];
            if (str === undefined || str === null) return "";

            let item = _.find(this.docFields.itemList, { "name": field });
            //console.log('item', item)
            //return str;
            if (item.options || item.optionsUrl) {
                if (item.optionsUrl) { // 有后台接口数据
                    let collData = this.fieldItemData[field];
                    if (collData && collData.length) {
                        if (item.component == 'sam-cascader') {
                            str = _.uniq(dataUtil.arrConversion(str));
                            let nodeStr = dataUtil.getTreeNode(collData, [...str], '/');
                            str = nodeStr;
                        } else {
                            if (!isNaN(str)) {
                                let data = _.find(collData, { "id": Number(str) });
                                let key = item.optionsUrl.label;
                                str = data ? data[key] : '';
                            } else if (_.isArray(str)) {
                                str = str.join(",");
                            }
                        }
                    }
                } else if (item.options && item.options.length) { // 标准化的值集
                    let op = _.find(item.options, { "value": str });
                    str = op ? op.label : '';
                }
            } else if (item.component == 'sam-date') {
                str = moment(str).format(item.format || 'YYYY-MM-DD');
            } else if (item.component == 'sam-cascader' && item.optionsConst) {
                if (!_.isArray(str)) {
                    str = [str];
                }
                let nodeStr = dataUtil.getTreeNode(this.$store.state.collectionData[item.optionsConst], [...str], '/');
                str = nodeStr;
            }
            return str;
        },
        // 按钮点击
        clickBtn(doc, fn) {
            this.currDoc = doc;
            this[fn].call();
        },
        // 下载文档
        downloadFn(event) {
            //console.log('downloadFn', this.currDoc);
            let title = this.currDoc.d_title.split(".");
            title.splice(title.length - 1, 1)
            this.$global.downloadFile(this.currDoc.d_docname, title.join("."));
        },
        // 预览
        viewFn(event) {
            axios.get('/download?type=output&filepath=' + this.currDoc.d_docname).then(res => {
                var PDFData = res.data.replace("data:application/pdf;base64,", "");
                this.pdfParams.pdfUrl = PDFData;
                this.visiblePdf = true;
            })
        },
        // 编辑及显示文档信息
        editFn(event) {
            this.visbleDoc = true;
            this.docData = [this.currDoc];
            for (let key in this.docformValue) {
                let item = _.find(this.docFields.itemList, { "key": key });
                this.docformValue[key] = this.currDoc[item.name];
            }
        },
        // 删除文档,同时删除服务器中的文档
        deleteFn(event, ids) {
            //console.log('deleteFn', this.currDoc);
            this.$confirm('确定要删除该文档?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let condition = {
                    type: 'removeData',
                    collectionName: "docinfo",
                    data: { id: this.currDoc.id }
                };
                if (ids) {
                    condition.data.id = { $in: ids };
                }
                //console.log('this.currDoc', this.currDoc)
                this.$axios.$post('mock/db', { data: condition }).then(res => {
                    let filepath = [];
                    if (!ids) {
                        let index = _.findIndex(this.docList, { "id": this.currDoc.id });
                        this.docList.splice(index, 1);
                        filepath = [this.currDoc.d_docname];
                    } else {
                        this.docList.forEach((item, idx) => {
                            if (ids.includes(item.id)) {
                                filepath.push(item.d_docname);
                                this.docList.splice(idx, 1);
                            }
                        })
                    }
                    this.$axios.$post('mock/files', { data: { type: 'removeFile', filepath: filepath } });
                })
            }).catch(() => { });

        },
        // 文档DOM鼠标事件 //btnStyle
        setCurrDoc(doc, evt) {
            //debugger
            let rect = evt.target.getBoundingClientRect();

            let btn = document.getElementById("doc-btns");
            let sw = Math.ceil((rect.width - btn.offsetWidth) / 2);
            this.btnStyle = {
                left: (rect.x + sw) + 'px',
                top: (rect.y - 40) + 'px'
            }

            this.currDoc = doc;

            console.log('setCurrDoc', doc)
        },
        getFolder(node) {
            return node.children ? 'folder' : 'empty-folder';
        },
        getExtName(file) {
            let ext = this.$global.getExt(file);
            return ext.toLocaleUpperCase();
        },
        // 此处还需优化
        getExt(file) {
            let ext = this.$global.getExt(file).toLocaleLowerCase();
            if (['doc', 'docx', 'xlsx', 'pdf', 'ppt', 'zip', 'rar'].includes(ext)) {
                return ext;
            }
            return "common";
        },
        startUpload() {
            if (!this.currNode) {
                this.$alert("请点击选择需要上传到目录！");
                return;
            }
            this.isAddFile = true;
            this.uploadForm = { ...docform.uploadForm };
            this.uploadValue = { ...docform.uploadValue };
            //debugger
            /* if (this.doctype !== 'department') {
                this.uploadForm.itemList.splice(1, 1);
                delete this.uploadValue.d_muid;
            } */
        },
        resetUpload() {
            this.uploadList = [];
            this.picList = [];
        },
        // 从缓存中上传的文档列表中移除一个文档
        removeFileItem(index) {
            this.uploadList.splice(index, 1);
            this.picList.splice(index, 1);
        },
        // 提交上传，不适用封装的axios
        submitUpload() {
            //let data = { ...this.uploadValue };
            let isValidate = true, error = '';
            let refForm = this.$refs['uploadform'];
            isValidate = refForm.checkFormValidate();
            if (!isValidate) {
                this.$message.error('上传表单数据的验证有误，请核查！');
                return;
            }

            let formData = new FormData(), filePath = this.doctype;
            formData.append('path', filePath);

            this.uploadList.forEach((file, index) => {
                formData.append(`file_${index}`, file.raw);
            });

            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
                },
                transformRequest: [function (data) {
                    return data
                }]
            }
            axios.post("/upload", formData, config).then(res => {
                //console.log('progressEvent', res)
                if (res && res.status == 200) {
                    if (res.data && res.data.success) {
                        this.$message.info("上传成功");
                        this.addFiles(res.data.response);
                    }
                }
            });
        },
        // 添加文档数据到该目录下 1:部门内部文档 2:公司共享文档 3:个人私有文档
        addFiles(lists) {
            let d_doctype = 3;
            if (this.doctype == "department") {
                d_doctype = 1;
            } else if (this.doctype == "company") {
                d_doctype = 2;
            }
            let arr = lists.map(item => {
                let obj = _.merge({
                    "filecata_id": this.currNode ? this.currNode.id : 0,
                    "d_uid": this.$store.state.user.id,
                    "d_doctype": d_doctype,
                    "d_docname": item.filePath,
                    "d_size": item.size,
                    "d_title": item.originalFilename
                }, { ...this.uploadValue });
                return obj;
            })
            let condition = {
                type: 'addPatch',
                collectionName: "docinfo",
                data: arr
            };
            //console.log('addFiles', arr)
            //return;
            this.$axios.$post('mock/db', { data: condition }).then(res => {
                //console.log('addFiles', res);
                this.getFileList();
                this.isAddFile = false;
                //this.setCurrNode(this.currNode, true);
            });
        },
        uploadChange(file, fileList) {
            //console.log('uploadChange', file, fileList);
            if (file.status === 'ready') {
                this.uploadList.push(file);
                let windowURL = window.URL || window.webkitURL;
                let obj = {
                    'url': windowURL.createObjectURL(file.raw),
                    'uid': file.uid,
                    'name': file.raw.name,
                    'size': file.raw.size,
                    'status': file.status,
                    'percent': 0
                };
                this.picList.push(obj);
            }
        },
        // 添加目录事件
        addDir(node = null) {
            this.currNode = node;
            this.formTitle = "添加一级目录";
            if (node) {
                this.formTitle = "添加【" + node.name + "】下级目录";
            }
            //console.log('addDir', this.currNode);
            this.isAddForm = true;
            this.catValue.name = "";
        },
        // 更新文档目录名称
        updateNode() {
            this.submitForm(this.editNode);

        },
        // 保存目录
        submitForm(obj) {
            let data = { ...this.catValue };
            let isValidate = true, error = '';
            if (obj) {
                data = obj;
            } else {
                data.pid = this.currNode ? this.currNode.id : 0;
                let refForm = this.$refs['editform'];
                isValidate = refForm.checkFormValidate();
                error = '表单数据的验证有误，请核查！';
            }

            // 检验目录名是否有重复
            let nodeIndex = _.findIndex(this.sourceData, { "name": data.name, "pid": data.pid });
            if (!!~nodeIndex) {
                isValidate = false;
                error = "同级文档目录名称已经存在！";
            }
            if (!isValidate) {
                this.$message.error(error);
                return;
            }
            data.type = this.getDocCatType();
            if (this.doctype == "user" && !obj) {
                data.uid = this.$store.state.user.id;
            } else if (this.doctype == "department") {
                data.department = this.$store.state.user.department;
            }
            let condition = {
                type: 'addData',
                collectionName: "fileCatalog",
                data: data
            };
            // 更新
            if (obj) {
                condition.type = "updateData";
                //condition.data.id = this.editNode.id;
            }
            this.$axios.$post('mock/db', { data: condition }).then(res => {
                //console.log('submitForm', res, this.sourceData);
                if (res) {
                    if (res === true) { // 做数据更新
                        let index = _.findIndex(this.sourceData, { "id": data.id });
                        this.$set(this.sourceData, index, data);
                        if (this.currNode) {
                            this.currNode.name = data.name;
                        }
                    } else {
                        this.sourceData.push(res);
                    }
                    this.treeData = this.$global.toTree([...this.sourceData], { parentKey: 'pid' });
                    this.isAddForm = false;
                    this.editNode = null;
                    this.$message.success("目录保存成功！");
                }

            });
        },
        // 获取目录类型
        getDocCatType() {
            let type = 0;
            switch (this.doctype) {
                case "user":
                    return 0;
                case "department":
                    return 1;
                case "company":
                    return 2;
            }
        },
        // 展开编辑
        editTree(data) {
            this.editNode = { ...data };
            this.catValue.name = data.name;
            this.isAddForm = false;
        },
        getChildNodes(list) {
            const getNodeIds = (arr) => {
                let ids = [];
                arr.forEach(item => {
                    ids.push(item.id);
                    if (item.children) {
                        ids = ids.concat(getNodeIds(item.children));
                    }
                });
                return ids;
            }
            return getNodeIds(list);
        },
        // 删除目录; 先判断目录下是否存在文档
        async removeTree(node, data) {
            //console.log('removeTree', node, data);
            let msg = "确定要删除该文档目录吗?", ids = [data.id];
            // 检查下级目录
            if (data.children) {
                ids = ids.concat(this.getChildNodes(data.children));
                ids = _.uniq(ids);
                msg = "该目录下包含个" + (ids.length - 1) + "下级目录，";
            }
            //console.log('目录ids', ids);

            let condition = {
                type: 'listData',
                collectionName: "docinfo",
                data: { "filecata_id": { $in: ids } }
            };
            let docList = await this.$axios.$post('mock/db', { data: condition });
            //console.log('docList', docList);
            if (docList && docList.list.length) {
                msg += "共有" + docList.list.length + "个文档，将同时删除相关的所有文档!"
            }
            this.$confirm(msg, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (!this.loadingMask) {
                    this.loadingMask = this.$loading({ background: 'rgba(0, 0, 0, 0.5)', text: '正在删除相关数据' });
                }
                // 删除目录
                let cn = {
                    type: 'removeData',
                    collectionName: "fileCatalog",
                    data: { "id": { $in: ids } }
                };
                this.$axios.$post('mock/db', { data: cn }).then(res => {
                    if (res) {
                        ids.forEach(id => {
                            let nodeIndex = _.findIndex(this.sourceData, { "id": id });
                            if (!!~nodeIndex) {
                                this.sourceData.splice(nodeIndex, 1);
                            }
                            let cIndex = _.findIndex(this.childrenList, { "id": id });
                            if (!!~cIndex) {
                                this.childrenList.splice(cIndex, 1);
                            }
                        });
                        this.treeData = this.$global.toTree([...this.sourceData], { parentKey: 'pid' });
                        // 删除文档数据
                        if (docList.list.length) {
                            let fids = [], filepath = [];
                            docList.list.map(item => {
                                fids.push(item.id);
                                filepath.push(item.d_docname);
                            })
                            let cd = {
                                type: 'removeData',
                                collectionName: "docinfo",
                                data: { id: { $in: fids } }
                            };
                            this.$axios.$post('mock/db', { data: cd }).then(res => {
                                if (res) {
                                    // 删除文档
                                    this.$axios.$post('mock/files', { data: { type: 'removeFile', filepath: filepath } });
                                    fids.forEach(id => {
                                        let fIndex = _.findIndex(this.docList, { "id": id });
                                        if (!!~fIndex) {
                                            this.docList.splice(fIndex, 1);
                                        }
                                    })
                                    this.loadingMask.close()
                                }
                            })
                        } else {
                            this.loadingMask.close();
                        }
                    } else {
                        this.loadingMask.close()
                    }

                })

            }).catch(() => { });
        },

        // 节点上点击列出该目录下文档
        nodeClick(data) {
            //console.log('nodeClick', data);
            this.setCurrNode(data)
        },
        setCurrNode(data, flag) {
            this.isAddForm = false;
            this.isAddFile = false;
            this.uploadList = [];
            this.picList = [];

            this.childrenList = data.children || [];

            this.currNode = { ...data };
            this.getFileList();
        },

        handleDrop(draggingNode, dropNode, dropType, ev) {
            //console.log('tree drop: ', dropNode.label, dropType);
        },
        allowDrop(draggingNode, dropNode, type) {
            if (dropNode.data.label === '二级 3-1') {
                return type !== 'inner';
            } else {
                return true;
            }
        },
        // 鼠标动作，拖拽resize
        handlerMouseDown(evt) {
            this.dragging = true;
            let startX = evt.clientX;
            const handleMouseMove = (event) => {
                const deltaX = event.clientX - startX;
            }
            const handleMouseUp = () => {
                if (this.dragging) {
                    this.dragging = false;
                }
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.onselectstart = null;
                document.ondragstart = null;
            }
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        },
        // 搜索文档
        onSubmitSearch() {
            console.log('onSubmitSearch', this.searchForm);
            let params = {};
            for (let key in this.searchForm) {
                if (this.searchForm[key]) {
                    params[key] = dataUtil.getParamsByValue(this.searchForm[key]);
                }
            }
            console.log('onSubmitSearch', params);
            this.getFileList(params);
        },
        // 获取文档
        async getFileList(math = {}) {
            let condition = {
                type: 'listData',
                collectionName: "docinfo",
                data: math
            };
            if (this.doctype == "user") {
                condition.data.d_uid = this.$store.state.user.id;
            }
            // 加上目录参数
            condition.data.filecata_id = this.currNode ? this.currNode.id : 0;

            let res = await this.$axios.$post('mock/db', { data: condition });
            this.docList = res.list;
            this.sourceDocData = [...res.list];
            //console.log('getFileList', res);
        },
        // 获取文档树目录结构
        async getTreeList() {
            this.sourceData = [];
            this.treeData = [];
            this.childrenList = [];
            let condition = {
                type: 'listData',
                collectionName: "fileCatalog",
                data: {}
            };
            condition.data.type = this.getDocCatType();
            if (this.doctype == "user") {
                condition.data.uid = this.$store.state.user.id;
            } else if (this.doctype == "department") {
                condition.data.department = this.$store.state.user.department;
            }
            let res = await this.$axios.$post('mock/db', { data: condition });
            this.sourceData = [...res.list];

            this.treeData = this.$global.toTree(res.list, { parentKey: 'pid' });
            this.childrenList = res.list.filter(item => {
                return item.pid == 0;
            });
            //console.log('getTreeList', this.treeData);

            this.getFileList();
        },
        // 获取字段所对应的值集
        setItemData(item) {
            let conditon = {
                type: 'listData',
                collectionName: item.optionsUrl.table,
                data: item.optionsUrl.params || {},
                column: item.optionsUrl.column || {}
            }
            let key = item.name;
            this.$axios.$post('mock/db', { data: conditon }).then(res => {
                if (!this.fieldItemData[key]) {
                    let lists = res.list;
                    if (item.component == 'sam-cascader') {
                        lists = res.list.map(obj => {
                            return {
                                id: obj.id,
                                pid: item.optionsUrl.pid ? obj[item.optionsUrl.pid] : obj.pid,
                                value: obj[item.optionsUrl.value],
                                label: obj[item.optionsUrl.label]
                            }
                        });
                        lists = this.$global.toTree(lists);
                    }
                    this.fieldItemData[key] = lists;
                }
                //console.log('this.fieldItemData', this.fieldItemData);
            });
        },
        setDocFiledData() {
            this.docFields.itemList.forEach(item => {
                if (item.optionsUrl) {
                    this.setItemData(item);
                }
                this.docformValue[item.key] = "";
            })
        },

    },
    /* beforeMount() {
        this.getMyRoles();
    }, */
    mounted() {
        this.getTreeList();
        this.setDocFiledData();
    }
}
</script>

<style lang="scss" scoped>
@import './style';
</style>
