/* eslint-disable */
export default {
    /**
     *
     * @param {Array} dataList 数据源
     * @param {String} keyF key健值
     * @param {String} valueF value健值
     * @param {Array} needKeyList 需要展示的其他健值
     */
    convertDataToList(dataList, keyF, valueF, needKeyList = []) {
        if (!dataList || !dataList.length) return [];
        return dataList.map(function(dataItem) {
            let result = {
                label: dataItem[keyF],
                value: dataItem[valueF]
            }
            if (!!needKeyList) {
                needKeyList.map(key => {
                    result[key] = dataItem[key]
                })
            }
            return result
        })
    },
    /**
     * @param {Array} data 数组
     * @param {Function} filterFn 函数
     * @param {Object} opts 参数 childrenKeyName、idKeyName、parentKeyName
     */
    recurrence(data = [], opts = {}) {
        let {
            idKeyName = 'id',
                parentKeyName = 'parentId',
                childrenKeyName = 'children'
        } = opts;
        const __recurrenceList = (list) => {
            return list.map(item => {
                let childList = data.filter(child => child[parentKeyName] === item[idKeyName]);
                let array = __recurrenceList(childList);
                return array.length > 0 ? { ...item, [childrenKeyName]: array } : item;
            })
        }
        let result = data.filter(item => {
            return item[parentKeyName] === ''
        });
        return __recurrenceList(result)
    },
    // 数据递归成TREE
    toTree(data, opts = {}) {
        let parentKey = opts.parentKey || 'pid';
        data.forEach(function(item) {
            delete item.children;
        });
        var map = {};
        data.forEach(function(item) {
            map[item.id] = item;
        });
        var val = [];
        data.forEach(function(item) {
            var parent = map[item[parentKey]];
            if (parent) {
                (parent.children || (parent.children = [])).push(item);
            } else {
                val.push(item);
            }
        });
        return val;
    },
    /**
     * 获取树机构数据中的对应节点数据label
     * @param {*} arr 整个树数据 {value,label}
     * @param {*} value 数组 [1,4,9]
     */
    getTreeNode(arr, value, ext) {
        value = this.arrConversion(value);
        const getNode = (nodes, val) => {
            let str = [];
            for (let i = 0; i < val.length; i++) {
                let node = _.find(nodes, { "value": val[i] });
                if (node) {
                    str.push(node.label);
                    if (node.children) {
                        val.splice(i, 1);
                        str = str.concat(getNode(node.children, val));
                        break;
                    }
                    continue;
                }
            }
            return str;
        }
        let arrList = getNode(arr, value);
        //console.log('getTreeNode', arrList);
        return arrList.length ? arrList.join(ext || "-") : "";
    },
    // 多维数组转一维数组
    arrConversion(array) {
        const setArr = (arr) => {
            let newArr = [];
            for (let i = 0; i < arr.length; i++) {
                if (_.isArray(arr[i])) {
                    newArr = newArr.concat(setArr(arr[i]));
                } else {
                    newArr.push(arr[i]);
                }
            }
            return newArr;
        }
        return setArr(array);
    },
    // 根据数组获取对应节点名称
    getStrByCascader(arr, value, ext = '-', opts = { 'label': 'label' }) {
        /* if (_.isArray(value[0])) {
            value = value[0];
        } */
        value = this.arrConversion(value);
        console.log('getStrByCascader', value)
        const getArr = (nodes, val) => {
            let str = [];
            for (let i = 0; i < val.length; i++) {
                let node = _.find(nodes, { "id": val[i] });
                if (node) {
                    str.push(node[opts.label]);
                }
            }
            return str;
        }
        //debugger
        let arrList = getArr(arr, value);
        return arrList.join(ext || "-");
    },
    // 根据数组获取对应节点名称
    getStrByArray(arr, value, ext = '-', opts = { 'label': 'label' }) {
        const getArr = (nodes, val) => {
            let str = [];
            for (let i = 0; i < val.length; i++) {
                let node = _.find(nodes, { "id": val[i] });
                if (node) {
                    str.push(node[opts.label]);
                }
            }
            return str;
        }
        let arrList = getArr(arr, value);
        return arrList.join(ext || "-");
    },
	getParamsByValue(value){
		let params;
		if (_.isNumber(value)) {
            params = Number(value);
        } else if (_.isArray(value) && value.length) {
			params = { $in: value };
		} else if (_.isString(value)) {
            params = { $regex: value };
        }
		return params;
	},
    getSearchParams(item, value) {
        let params;
        if (_.isNumber(value)) {
            params = Number(value);
        } else if (_.isArray(value) && value.length) {
            if (item.component == 'sam-date') {
                params = {
                    $gte: value[0],
                    $lt: value[1] + 24 * 3600 * 1000 - 1
                }
			} else if(item.component == 'sam-cascader'){
                params = value;
            } else {
                params = { $in: value };
            }
        } else if (_.isString(value)) {
            params = { $regex: value };
        }
        return params;
    },
    checkValue(type, value) {
        switch (type) {
            case "Number":
                return Number(value);
				/*
			case "Array":
                return Number(value);
				*/
            default:
                return value;
        }
    },


    go(link, isNew, isFlow) {
        // 调用此方法需要go.call(this, ...);
        /* if (isNew) {
            this.$router.push(`/${link}`);
        } else {
            if (!link) {
                this.$message.error('链接有误, 无法跳转！');
            } else {
                let servie = this.$store.state.user.services.find(item => item.page === link);
                let argServiceId = '';
                if (servie) {
                    if ((link.indexOf('http') === 0 || link.indexOf('https') === 0) && !~link.indexOf('?')) {
                        argServiceId = `?serviceId=${servie.id}`;
                    } else if (servie.operationType == 11 || !!~link.indexOf('reportId')) { // sam+ 配置的报表服务，直接跳转到报表中心重定向
                        link = sysConfig.reportMain.SERVER_URL + link;
                    } else {
                        argServiceId = `&serviceId=${servie.id}`;
                    }
                }
                link = `${link}${argServiceId}`;

                if (link.indexOf('https') === 0 || link.indexOf('http') === 0) {
                    // sam+ 修改下弹窗方式，以免被拦截
                    let openUrl = `${link}${link.indexOf('?') ? '&' : '?'}token=${this.$cookies.get('token')}`;
                    let tempPage = window.open('', '_blank');
                    tempPage.location = openUrl;
                } else {
                    location.href = `${location.protocol}//${location.host}/${link}`;
                }
            }
        } */
    },
    html2text(html, no_rnt) {
        let node = document.createElement('div');
        node.innerHTML = html;
        let text = node.innerText;
        if (no_rnt) {
            text = text.replace(/\r|\n|\t/g, '');
        }
        return text;
    },
    /**
     * 首字母大写
     * @param  {String} word 文字
     * @return {String}      首字母大写后的文字
     */
    capitalizeUpper(word) {
        if (!word) return;
        return word.length > 1 ? word.substring(0, 1).toUpperCase() + word.substr(1) : word.substring(0, 1).toUpperCase()
    }
}
