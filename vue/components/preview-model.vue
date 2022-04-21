<template>
    <Renderer :resize="true" class="border border-gray-300" orbit-ctrl shadow>
        <Camera ref="camera" :position="camPosition" />
        <Scene background="#FFFFFF" ref="scene">
            <AmbientLight color="#726f6f" />
            <PointLight color="#ffffff" :intensity="0.8" :position="camPosition" />
        </Scene>
    </Renderer>
</template>

<script lang="ts" setup>
import * as THREE from "three";
import { BufferGeometry } from "three";
import { ref } from "vue";
import { AmbientLight, Camera, PointLight, Renderer, Scene } from "troisjs";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

/**
 * Button props.
 */
interface PreviewModel {
    id: string;
    uri: string;
}

/**
 * Props.
 */
const { uri, id } = defineProps<PreviewModel>();

/**
 * Scene.
 *
 * @type {InstanceType<typeof Scene> | null}
 */
const scene = ref<InstanceType<typeof Scene> | null>(null);

/**
 * Camera
 *
 * @type {InstanceType<typeof Camera> | null}
 */
const camera = ref<InstanceType<typeof Camera> | null>(null);

/**
 * Camera position.
 *
 * @type {}
 */
const camPosition = ref<InstanceType<any>>({ x: 0, y: 0, z: 0 });

/**
 * Loader.
 *
 */
const loader: STLLoader = new STLLoader();

/**
 * Load file.
 */
loader.load(uri, (geometry: BufferGeometry) => {
    const color = new THREE.Color("rgb(90,67,209)");
    const material = new THREE.MeshLambertMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    const middle = new THREE.Vector3();

    geometry.computeBoundingBox();
    geometry?.boundingBox?.getCenter(middle);

    mesh.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(-middle.x, -middle.y, -middle.z));

    //@ts-ignore
    scene.value?.add(mesh);

    //@ts-ignore
    const dimension = Math.max(geometry?.boundingBox?.max.x, geometry?.boundingBox?.max.y, geometry?.boundingBox?.max.z);

    //@ts-ignore
    camPosition.value = { x: dimension * 1.5, y: dimension * 1.5, z: dimension * 1.5 };
});
</script>
