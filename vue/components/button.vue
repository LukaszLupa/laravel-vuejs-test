<template>
    <button class="inline-flex items-center justify-center py-1.5 px-2.5 text-sm rounded shadow text-white"
            :class="[getType]"
            :disabled="disabled">
        <slot />
    </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

/**
 * Button props.
 */
interface ButtonProps {
    type?: "primary" | "success" | "danger";
    disabled?: boolean;
}

/**
 * Props.
 */
const { type = "primary", disabled = false } = defineProps<ButtonProps>();

/**
 * Get type.
 *
 * @return {string}
 */
const getType = computed<string>(() => {
    if (type === "success") {
        return "bg-green-900 hover:bg-green-700";
    }

    if (type === "danger") {
        return "bg-red-800 hover:bg-red-700";
    }

    return "bg-primary hover:bg-gray-700";
});
</script>
