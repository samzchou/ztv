<template>
    <section style="padding:25px">
        <sam-form :data="formData" />
    </section>
</template>

<script>
import samForm from '~/components/form';
export default {
    components: {
        samForm
    },
    data: () => ({
        formData: {
            isEdit: false,
            gutter: 20,
            colspan: 8,
            size: "mini",
            isEdit: true,
            itemList: [
                {
                    "type": "String",
                    "name": "field_1",
                    "component": "sam-input",
                    "cptype": "text",
                    "default": '',
                    "label": '专业技术职务'
                },
                {
                    "type": "Number",
                    "name": "field_2",
                    "component": "sam-select",
                    "options": [
                        { "label": "较差", "id": 1 },
                        { "label": "一般", "id": 2 },
                        { "label": "良好", "id": 3 }
                    ],
                    "required": true,
                    "default": 0,
                    "label": '健康状况'
                },
                {
                    "type": "String",
                    "name": "field_3",
                    "component": "sam-input",
                    "cptype": "text",
                    "default": '',
                    "label": '专业职称'
                },
                {
                    "type": "String",
                    "name": "field_4",
                    "component": "sam-input",
                    "cptype": "textarea",
                    "default": '',
                    "label": '荣誉',
                    "colspan": 16
                }
            ]
        }
    })
}
</script>
