<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>

    <<%= schema.label %>ShowWidget :model="model" :fetching="fetching" />

    <div class="row">
      <%_ schema.relations.forEach((rel) => { _%>
      <div class="col-lg-12">
        <%_ if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
        <<%= rel.alias.class_name %> :model="<%= rel.alias.identifier %>" v-if="<%= rel.alias.identifier %>._id" />
        <%_ } else if (rel.type === 'HAS_MANY') { _%>
        <<%= rel.alias.class_name_plural %> :collection="<%= rel.alias.identifier_plural %>" />
        <%_ } else if (rel.type === 'REF_BELONGS_TO') { _%>
        <<%= rel.alias.class_name_plural %> :collection="<%= rel.alias.identifier_plural %>" />
        <%_ } _%>
      </div>

      <%_ }) _%>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadingFull from '@/components/LoadingFull'
import <%= schema.class_name %>ShowWidget from '@/modules/<%= schema.identifier %>/components/<%= schema.class_name %>ShowWidget'
<%_ let imported = [] _%>
<%_ schema.relations.forEach((rel) => { _%>
<%_ if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
import <%= rel.alias.class_name %> from '@/modules/<%= schema.identifier %>/components/<%= rel.alias.class_name %>'
<%_ imported.push(rel.type) _%>
<%_ } else if (rel.type === 'HAS_MANY') { _%>
import <%= rel.alias.class_name_plural %> from '@/modules/<%= schema.identifier %>/components/<%= rel.alias.class_name_plural %>'
<%_ imported.push(rel.type) _%>
<%_ } else if (rel.type === 'REF_BELONGS_TO') { _%>
import <%= rel.alias.class_name_plural %> from '@/modules/<%= schema.identifier %>/components/<%= rel.alias.class_name_plural %>'
<%_ imported.push(rel.type) _%>
<%_ } _%>
<%_ }) _%>

export default {
  props: ['id'],
  name: '<%= schema.identifier %>_show',
  metaInfo: {
    title: '<%= schema.label %>s - Show'
  },
  components: {
    <%_ schema.relations.forEach((rel) => { _%>
    <%_ if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
    <%= rel.alias.class_name %>,
    <%_ } else if (rel.type === 'HAS_MANY') { _%>
    <%= rel.alias.class_name_plural %>,
    <%_ } else if (rel.type === 'REF_BELONGS_TO') { _%>
    <%= rel.alias.class_name_plural %>,
    <%_ } _%>
    <%_ }) _%>
    <%= schema.class_name %>ShowWidget,
    LoadingFull
  },
  created () {
    this.fetch(this.id)
    <%_ schema.relations.forEach((rel) => { _%>
    <%_ if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
    this.<%= 'fetch' + rel.alias.class_name %>(this.id)
    <%_ } else if (rel.type === 'HAS_MANY') { _%>
    this.<%= 'fetch' + rel.alias.class_name_plural %>(this.id)
    <%_ } else if (rel.type === 'REF_BELONGS_TO') { _%>
    this.<%= 'fetch' + rel.alias.class_name_plural %>(this.id)
    <%_ } _%>
    <%_ }) _%>
  },
  methods: mapActions({
    <%_ schema.relations.forEach((rel) => { _%>
    <%_ if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
    <%= 'fetch' + rel.alias.class_name %>: '<%= schema.identifier %>/<%= 'fetch' + rel.alias.class_name %>',
    <%_ } else if (rel.type === 'HAS_MANY') { _%>
    <%= 'fetch' + rel.alias.class_name_plural %>: '<%= schema.identifier %>/<%= 'fetch' + rel.alias.class_name_plural %>',
    <%_ } else if (rel.type === 'REF_BELONGS_TO') { _%>
    <%= 'fetch' + rel.alias.class_name_plural %>: '<%= schema.identifier %>/<%= 'fetch' + rel.alias.class_name_plural %>',
    <%_ } _%>
    <%_ }) _%>
    fetch: '<%= schema.identifier %>/fetchModel',
    onConfirmDestroy: '<%= schema.identifier %>/deleteModel'
  }),
  computed: mapGetters({
    <%_ schema.relations.forEach((rel) => { _%>
    <%_ if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
    <%= rel.alias.identifier %>: '<%= schema.identifier %>/<%= rel.alias.identifier %>',
    <%_ } else if (rel.type === 'HAS_MANY') { _%>
    <%= rel.alias.identifier_plural %>: '<%= schema.identifier %>/<%= rel.alias.identifier_plural %>',
    <%_ } else if (rel.type === 'REF_BELONGS_TO') { _%>
    <%= rel.alias.identifier_plural %>: '<%= schema.identifier %>/<%= rel.alias.identifier_plural %>',
    <%_ } _%>
    <%_ }) _%>
    model: '<%= schema.identifier %>/model',
    fetching: '<%= schema.identifier %>/fetching'
  })
}
</script>
