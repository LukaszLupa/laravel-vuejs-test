<template>
    <div class="upload-card">
        <div class="logo">
            <img src="images/logo.jpg" />
        </div>

        <div class="drag-drop-area"
             :class="{'dragover': isDragover}"
             @drop.prevent="onDrop($event)"
             @dragover.prevent="dragover"
             @dragenter.prevent="dragenter"
             @dragleave.prevent="dragleave">
            <div v-if="isDragover">
                <div class="text-gray-500">Drop file(s) to add them to the upload queue</div>
            </div>

            <div v-else class="text-center space-y-3">
                <div class="text-gray-500">Drag and drop your files anywhere</div>

                <div class="relative">
                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                        <div class="w-full border-t border-gray-300" />
                    </div>
                    <div class="relative flex justify-center">
                        <span class="px-2 bg-white text-sm text-gray-400"> or </span>
                    </div>
                </div>

                <v-button class="w-full md:w-36" @click="selectFile">
                    <upload-icon class="w-4 h-4 mr-2" />
                    Click here
                </v-button>

                <input ref="selectFileRef" type="file" class="hidden" accept=".stl" @change="selectedFile"
                       multiple />
            </div>
        </div>

        <div class="preview">
            <div v-for="file in allFiles" class="item"
                 :class="{'error': file.errorMsg, 'success': file.uploaded}">
                <div class="badge" :class="{'error': file.errorMsg, 'success': file.uploaded}"></div>

                <div class="flex flex-col justify-between items-center space-y-3">
                    <div class="w-full">
                        <preview-model :id="file.id" :uri="file.uri" />
                    </div>

                    <div class="flex flex-col">
                        <div class="w-full">
                            <div v-if="file.errorMsg" class="w-full text-red-400 text-center mb-1">{{ file.errorMsg }}
                            </div>
                            <span class="font-semibold">File name:</span> {{ file.instance.name }}<br />
                            <span class="font-semibold">File size:</span> {{ convertBToFormat(file.instance.size) }}
                        </div>
                    </div>

                    <div>
                        <v-button type="danger" @click="removeFile(file)">
                            <trash-icon class="w-4 h-4" />
                        </v-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Loader } from "three";
import { TrashIcon, UploadIcon } from "@heroicons/vue/outline";
import { API } from "./utils/API";
import { v4 as uuid } from "uuid";
import { convertBToFormat } from "./utils/helpers";

import forEach from "lodash.foreach";
import PreviewModel from "./components/preview-model.vue";

/**
 * File model.
 */
interface FileModel {
    id: string;
    uploaded: boolean;
    processing: boolean;
    errorMsg: string | null;
    instance: File;
    uri: string | null;
    filename: string | null;
}

/**
 * Session id.
 *
 * @type {string}
 */
const sessionId: string = uuid();

/**
 * Loader.
 */
const loader: Loader = new STLLoader();

/**
 * Select file instance.
 *
 * @type {InstanceType<any> | null}
 */
const selectFileRef = ref<InstanceType<any> | null>(null);

/**
 * List of all selected files.
 *
 * @type {FileModel[]}
 */
let allFiles = ref<FileModel[]>([]);

/**
 * Is dragover?
 *
 * @type {boolean}
 */
let isDragover = ref<boolean>(false);

/**
 * Open select file popup.
 */
function selectFile(): void {
    selectFileRef.value?.click();
}

/**
 * Push files into list.
 *
 * @param {File[] | } files
 */
async function pushFilesIntoList(files: FileList | undefined) {
    forEach(files, async (file: File) => {
        await uploadFile(file);
    });
}

/**
 * Selected file.
 */
function selectedFile(): void {
    pushFilesIntoList(selectFileRef.value.files);
}

/**
 * On drop
 * @param event
 */
function onDrop(event: DragEvent): void {
    pushFilesIntoList(event.dataTransfer?.files);
    isDragover.value = false;
}

/**
 * On dragover.
 */
function dragover() {
    isDragover.value = true;
}

/**
 * On dragenter
 */
function dragenter() {
    isDragover.value = true;
}

/**
 * On dragleave.
 */
function dragleave() {
    isDragover.value = false;
}

/**
 * Remove file from list.
 *
 * @param {FileModel} file
 */
async function removeFile(file: FileModel) {
    console.log(file);

    await API.post("/upload/remove", { dirname: sessionId, filename: file.filename })
        .then(() => {
            const index: number = allFiles.value.map((file: FileModel) => file.id).indexOf(file.id);

            allFiles.value.splice(index, 1);
        });
}

/**
 * Upload file into disk.
 *
 * @param {File} file
 */
async function uploadFile(file: File): Promise<void> {
    let model: FileModel = {
        id: uuid(),
        uploaded: false,
        processing: true,
        errorMsg: null,
        instance: file,
        uri: null,
        filename: null,
    };

    const formPayload: FormData = new FormData();

    formPayload.append("session_id", sessionId);
    formPayload.append("file", file);

    await API.post("/upload", formPayload)
        .then(({ data }) => {
            model.uri = data.path;
            model.filename = data.filename;
            model.uploaded = true;
        })
        .catch((error) => model.errorMsg = error.response?.data?.errors?.file[0])
        .finally(() => model.processing = false);

    allFiles.value.push(model);
}
</script>
