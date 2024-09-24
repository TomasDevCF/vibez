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
    created_at: column.date({optional: false}),
    description: column.text({optional: true})
  }
})

const Posts = defineTable({
  columns: {
    post_id: column.number({primaryKey: true, unique: true, optional: false}),
    user_id: column.number({references: () => Users.columns.user_id}),
    body: column.text({optional: false}),
    is_comment: column.boolean({optional: true}),
    commented_post_id: column.number({optional: true}),
    created_at: column.date({optional: false}),
    is_reposted: column.boolean({optional: true}),
    reposted_post_id: column.number({optional: true}),
  }
})

const Images = defineTable({
  columns: {
    image_id: column.number({primaryKey: true, unique: true, optional: false}),
    post_id: column.number({references: () => Posts.columns.post_id}),
    image_url: column.text({optional: false}),
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

const Follows = defineTable({
  columns: {
    follow_id: column.number({primaryKey: true, unique: true, optional: false}),
    followed_id: column.number({references: () => Users.columns.user_id}),
    follower_id: column.number({references: () => Users.columns.user_id}),
    followed_at: column.date(),
}})

export default defineDb({
  tables: {
    Users,
    Posts,
    Likes,
    Follows,
    Images
  }
});


/*
Bien, necesito hacer lo siguiente:
tengo una base de datos de Users que tiene esto: 
user_id: column.number({primaryKey: true, unique: true, optional: false}),
    name: column.text({optional: false, unique: false}),
    username: column.text({optional: false, unique: true}),
    image: column.text({optional: true, unique: false}),
    email: column.text({optional: false, unique: true}),
    password: column.text({optional: true}),
    created_at: column.date({optional: false})
Y otra llamada Follows:
follow_id: column.number({primaryKey: true, unique: true, optional: false}),
    followed_id: column.number({references: () => Users.columns.user_id}),
    follower_id: column.number({references: () => Users.columns.user_id}),
    followed_at: column.date(),

Quiero hacer esto: seleccionar 8 usuarios que cumplan estas reglas:
1- que ninguno sea mi propio usuario.
2- que no se seleccione si yo estoy siguiendo al usuario
3- que se ordene por mayor seguidores
4-  
*/