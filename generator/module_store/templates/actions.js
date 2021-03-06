import router from '@/routers'
import axios from 'axios'
import { $POST, $PUT, $DEL } from '@/store/lib/helpers'

const API_ROOT = '/api/<%= schema.identifier_plural %>'

// // // //

export default {
  <%_ schema.relations.forEach((rel) => { _%>
  <%_ if (rel.type === 'REF_BELONGS_TO') { _%>
  // OWNS MANY
  // GET /api/<%= schema.identifier_plural %>/:id/<%= rel.alias.identifier_plural %>
  <%= 'fetch' + rel.alias.class_name_plural %> ({ state, commit, dispatch }, <%= schema.identifier %>Id) {
    commit('fetching', true)

    axios.get(API_ROOT + '/' + <%= schema.identifier %>Id + '/<%= rel.alias.identifier_plural %>', {
      // headers: {
      //   authorization: rootGetters['auth/token']
      // },
      // params: {
      //   search: state.filter,
      //   page: state.currentPage,
      //   per_page: state.pageSize
      // }
    })
    .then(({ data }) => {
      commit('<%= rel.alias.identifier_plural %>', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  <%_ } else if (rel.type === 'HAS_MANY') { _%>
  <%= 'fetch' + rel.alias.class_name_plural %> ({ state, commit, dispatch }, <%= schema.identifier %>Id) {
    commit('fetching', true)

    axios.get(API_ROOT + '/' + <%= schema.identifier %>Id + '/<%= rel.alias.identifier_plural %>', {
      // headers: {
      //   authorization: rootGetters['auth/token']
      // },
      // params: {
      //   search: state.filter,
      //   page: state.currentPage,
      //   per_page: state.pageSize
      // }
    })
    .then(({ data }) => {
      commit('<%= rel.alias.identifier_plural %>', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  <%_ } else if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
  // BELONGS TO
  // GET /api/<%= schema.identifier_plural %>/:id/<%= rel.alias.identifier %>
  <%= 'fetch' + rel.alias.class_name %> ({ state, commit, dispatch }, <%= schema.identifier %>Id) {
    commit('fetching', true)
    axios.get(API_ROOT + '/' + <%= schema.identifier %>Id + '/<%= rel.alias.identifier %>', {
    })
    .then(({ data }) => {
      commit('<%= rel.alias.identifier %>', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  <%_ } _%>
  <%_ }) _%>

  // GET /api/<%= schema.identifier_plural %>
  fetchCollection ({ state, commit, dispatch }) {
    commit('fetching', true)
    axios.get(API_ROOT)
    .then(({ data }) => {
      commit('collection', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  // GET /api/<%= schema.identifier_plural %>/:id
  fetchModel ({ state, commit, dispatch }, <%= schema.identifier %>Id) {
    commit('fetching', true)
    axios.get(`${API_ROOT}/${<%= schema.identifier %>Id}`, {
      // headers: {
      //   authorization: rootGetters['auth/token']
      // }
    })
    .then(({ data }) => {
      commit('model', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  // GET /api/<%= schema.identifier_plural %>/:id
  fetchEditModel ({ state, commit, dispatch }, <%= schema.identifier %>Id) {
    commit('fetching', true)
    axios.get(`${API_ROOT}/${<%= schema.identifier %>Id}`, {
      // headers: {
      //   authorization: rootGetters['auth/token']
      // }
    })
    .then(({ data }) => {
      commit('editModel', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  // POST /api/<%= schema.identifier_plural %>
  createModel ({ state, commit, dispatch }, <%= schema.identifier %>Model) {
    commit('fetching', true)
    $POST(`${API_ROOT}`, {
      body: <%= schema.identifier %>Model
    })
    .then((<%= schema.identifier %>) => {
      commit('fetching', false)
      router.push(`/<%= schema.identifier_plural %>`)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Create error', context: 'danger', dismissible: true }, { root: true })
      throw err
    })
  },
  // PUT /api/<%= schema.identifier_plural %>/:id
  updateModel ({ state, commit }, <%= schema.identifier %>Model) {
    commit('fetching', true)
    $PUT(`${API_ROOT}/${<%= schema.identifier %>Model._id}`, {
      body: <%= schema.identifier %>Model
    })
    .then((<%= schema.identifier %>) => {
      commit('fetching', false)
      router.push(`/<%= schema.identifier_plural %>/${<%= schema.identifier %>._id}`)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Update error', context: 'danger', dismissible: true }, { root: true })
      throw err
    })
  },
  // DELETE /api/<%= schema.identifier_plural %>/:id
  deleteModel ({ state, commit }, <%= schema.identifier %>Model) {
    commit('fetching', true)
    $DEL(`${API_ROOT}/${<%= schema.identifier %>Model._id}`)
    .then((<%= schema.identifier %>) => {
      commit('fetching', false)
      let collection = _.filter(state.collection, (m) => { return m._id !== <%= schema.identifier %>Model._id })
      commit('collection', collection)
      router.push(`/<%= schema.identifier_plural %>`)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Destroy error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  }
}
