<script lang="ts" setup>
import CodeJsonIcon from 'src/material-design-icons/CodeJson.vue'
import FilePdfBoxOutlineIcon from 'src/material-design-icons/FilePdfBoxOutline.vue'
import ImageOutlineIcon from 'src/material-design-icons/ImageOutline.vue'
import SitemapIcon from 'src/material-design-icons/Sitemap.vue'
import TextIcon from 'src/material-design-icons/Text.vue'
import { useAppStore } from 'src/stores/app.store'
import UDropdown from 'src/U/components/UDropdown.vue'
import UMenuItem from 'src/U/components/UMenuItem.vue'
import DownloadIcon from '../../../material-design-icons/Download.vue'
import UButton from '../../../U/components/UButton.vue'

const app = useAppStore()

</script>

<template>
    <UDropdown class="download-project-dd">
        <UButton icon transparent v-tooltip="'Export'">
            <DownloadIcon/>
        </UButton>

        <template #content>
            <div class="py-2 content" style="min-width: 12em;">
                <h4 class="text-center text-muted">Export Sitemap</h4>
                <UMenuItem @click="app.downloadPdf()">
                    <FilePdfBoxOutlineIcon/>
                    PDF
                </UMenuItem>
                <UMenuItem @click="app.downloadPng()">
                    <ImageOutlineIcon/>
                    PNG
                </UMenuItem>
                <UMenuItem @click="app.downloadSitemap('json')">
                    <CodeJsonIcon/>
                    JSON
                </UMenuItem>
                <UMenuItem @click="app.downloadSitemap('txt')">
                    <TextIcon/>
                    Text
                </UMenuItem>
                <UMenuItem @click="app.downloadSitemap('xml')">
                    <SitemapIcon/>
                    Sitemap.xml
                </UMenuItem>
            </div>
        </template>
    </UDropdown>
</template>

