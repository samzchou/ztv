<template>
    <el-input :value="value" @input="handleInput" @focus="selectAll" @blur="formatValue" :disabled="disabled">
        <template v-if="prepend" slot="prepend">{{prepend}}</template>
        <template v-if="append" slot="append">{{append}}</template>
    </el-input>
</template>

<script>
export default {
    name: "input-number",
    props: {
        value: [Number, String],
        append: {
            type: String
        },
        prepend: {
            type: String
        },
        decimal1: {},
        min: {
            type: Number,
            default: -Infinity
        },
        max: {
            type: Number,
            default: Infinity
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.$nextTick(this.formatValue)
    },
    methods: {
        handleInput(value) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => { this.updateValue(value) }, 200);
        },
        updateValue(valueStr) {
            let result = this.parse(valueStr, this.value);
            let v = result.value;
            if (v < this.min) v = this.min;
            if (v > this.max) v = this.max;
            this.$emit('input', v);
            setTimeout(this.formatValue, 20);
        },
        formatValue() {
            this.$el.querySelector('input').value = this.format(this.value);
        },
        // focus
        selectAll(event) {
            setTimeout(() => {
                event.target.select();
            }, 0)
        },
        format(number) {
            if (this.decimal1 === undefined || this.decimal1 === null) return number;
            return (Math.trunc(number * 1000000000000) / 1000000000000).toFixed(this.decimal1);
        },
        parse(newString, oldNumber) {
            var CleanParse = (value) => {
                return { value }
            }
            var CurrencyWarning = (warning, value) => {
                return {
                    warning,
                    value,
                    attempt: newString
                }
            }
            var NotAValidDollarAmountWarning = (value) => {
                return new CurrencyWarning(newString + '不合法的数字', value);
            }
            var AutomaticConversionWarning = (value) => {
                return new CurrencyWarning(newString + '已自动转换为' + value, value);
            }

            var newNumber = Number(newString);
            var indexOfDot = newString.indexOf('.');
            var indexOfE = newString.indexOf('e');

            if (isNaN(newNumber)) {
                if (indexOfDot === -1 && indexOfE > 0 && indexOfE === newString.length - 1 && Number(newString.slice(0, indexOfE)) !== 0) {
                    return new CleanParse(oldNumber);
                } else {
                    return new NotAValidDollarAmountWarning(oldNumber);
                }
            }
            var newCurrencyString = this.format(newNumber);
            var newCurrencyNumber = Number(newCurrencyString);

            if (newCurrencyNumber === newNumber) {
                if (indexOfE !== -1 && indexOfE === newString.length - 2) {
                    return new AutomaticConversionWarning(newNumber);
                } else {
                    return new CleanParse(newNumber);
                }
            } else {
                return new NotAValidDollarAmountWarning(newNumber > newCurrencyNumber ? newCurrencyNumber : oldNumber);
            }
        }
    }
}
</script>

