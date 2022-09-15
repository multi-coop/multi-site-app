<template>
  <b-tag
    v-if="item.tag"
    class="mr-1"
    :type="`is-${item.tag.type}`"
    size="is-small"
    :rounded="item.tag.rounded"
    :icon="item.tag.icon">
    <span
      v-if="item.tag.label"
      class="has-text-weight-bold">
      {{ $translate('label', item.tag) }}
    </span>
  </b-tag>
</template>

<script>

export default {
  name: 'NavbarItemTag',
  props: {
    item: {
      default: undefined,
      type: Object
    }
  }
}
</script>
