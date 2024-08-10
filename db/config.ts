import { column, defineDb, defineTable } from 'astro:db';

// https://astro.build/db/config

const Users = defineTable({
  columns: {
    user_id: column.number({primaryKey: true, unique: true, optional: false}),
    name: column.text({optional: false, unique: false}),
    username: column.text({optional: false, unique: true}),
    image: column.text({optional: true, unique: false}),
    email: column.text({optional: false, unique: true}),
    password: column.text({optional: true}),
    created_at: column.date({optional: false})
  }
})

const Posts = defineTable({
  columns: {
    post_id: column.number({primaryKey: true, unique: true, optional: false}),
    user_id: column.number({references: () => Users.columns.user_id}),
    body: column.text({optional: false}),
    created_at: column.date({optional: false})
  }
})

const Likes = defineTable({
  columns: {
    like_id: column.number({primaryKey: true, unique: true, optional: false}),
    post_id: column.number({references: () => Posts.columns.post_id}),
    user_id: column.number({references: () => Users.columns.user_id}),
    created_at: column.date({optional: false})
  }
})

const Comments = defineTable({
  columns: {
    comment_id: column.number({primaryKey: true, unique: true, optional: false}),
    post_id: column.number({references: () => Posts.columns.post_id}),
    user_id: column.number({references: () => Users.columns.user_id}),
    body: column.text({optional: false}),
    created_at: column.date({optional: false})
  }
})

export default defineDb({
  tables: {
    Users,
    Posts,
    Likes,
    Comments
  }
});
