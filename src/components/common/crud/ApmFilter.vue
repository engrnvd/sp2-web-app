<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
    /*
    * Name of the field to be displayed
    * */
    fieldLabel: {
        type: String,
        required: true
    },
    /*
    * name to be sent to onChange() (to the server e.g.)
    * */
    fieldName: {
        type: String,
        required: true
    },
    /*
    * Type of the field e.g. text, number, date, select, date
    * */
    fieldType: {
        type: String,
        default: 'text'
    },
    /*
    * Following options apply only to 'select' type
    * */
    optionsUrl: String, // url to fetch options from
    optionLabelField: String, // field to be displayed for an option
    optionValueField: String, // field whose value is to be set for the selected option
    options: { // will be preferred over optionsUrl
        type: Array,
        default: function () {
            return []
        }
    },
    /*
    * Standard v-model
    * */
    modelValue: {
        required: true
    },
    /*
    * sometimes you don't want to allow sorting via a field e.g. Tone Analysis on Sms Conversations page
    * */
    hideSorting: {
        type: Boolean,
        default: false
    },
    hideSearching: {
        type: Boolean,
        default: false
    },
})

</script>

<template>
    <div>
        {{ fieldLabel }}
    </div>
</template>

<style scoped lang="scss">
</style>
