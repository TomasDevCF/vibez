import { Follows, Likes, Posts } from 'astro:db';
import { Users, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Users).values([
		{
			username: "juanperez1985",
			name: "Juan Pérez",
			image: "https://randomuser.me/api/portraits/men/1.jpg",
			email: "juan@example.com",
			created_at: new Date("2023-01-01"),
			description: "Tengo 38 años y soy un apasionado del fútbol. \nTrabajo como ingeniero civil, construyendo sueños en forma de edificios. \nDisfruto mucho pasar tiempo con mi familia y viajando por el mundo."
		},
		{
			username: "mariagomez1990",
			name: "María Gómez",
			image: "https://randomuser.me/api/portraits/women/1.jpg",
			email: "maria@example.com",
			created_at: new Date("2023-01-02"),
			description: "Soy María, tengo 33 años. \nSoy diseñadora gráfica, creando identidades visuales para pequeñas y grandes empresas. \nMe encanta el arte digital y en mi tiempo libre, disfruto pintando."
		},
		{
			username: "pedromartinez1983",
			name: "Pedro Martínez",
			image: "https://randomuser.me/api/portraits/men/2.jpg",
			email: "pedro@example.com",
			created_at: new Date("2023-01-03"),
			description: "Me llamo Pedro, y tengo 41 años. \nTrabajo como médico pediatra en un hospital local. \nSoy un ávido lector de novelas de misterio y disfruto de las caminatas al aire libre."
		},
		{
			username: "analopez1988",
			name: "Ana López",
			image: "https://randomuser.me/api/portraits/women/2.jpg",
			email: "ana@example.com",
			created_at: new Date("2023-01-04"),
			description: "Tengo 36 años y soy profesora de historia en una secundaria. \nMe apasiona enseñar y compartir conocimientos con mis alumnos. \nEn mi tiempo libre, disfruto leyendo y cocinando recetas nuevas."
		},
		{
			username: "luisrodriguez1982",
			name: "Luis Rodríguez",
			image: "https://randomuser.me/api/portraits/men/3.jpg",
			email: "luis@example.com",
			created_at: new Date("2023-01-05"),
			description: "Soy Luis, tengo 42 años. \nTrabajo como programador en una empresa de tecnología. \nMe fascina la tecnología y siempre estoy explorando nuevas herramientas y lenguajes de programación."
		},
		{
			username: "laurafernandez1987",
			name: "Laura Fernández",
			image: "https://randomuser.me/api/portraits/women/3.jpg",
			email: "laura@example.com",
			created_at: new Date("2023-01-06"),
			description: "Tengo 37 años y soy fotógrafa profesional. \nMi pasión es capturar momentos especiales en la vida de las personas. \nEn mi tiempo libre, me encanta hacer yoga y viajar."
		},
		{
			username: "javiersanchez1980",
			name: "Javier Sánchez",
			image: "https://randomuser.me/api/portraits/men/4.jpg",
			email: "javier@example.com",
			created_at: new Date("2023-01-07"),
			description: "Soy Javier, tengo 44 años. \nTrabajo como abogado especializado en derecho corporativo. \nMe gusta correr maratones y soy un fanático de la música clásica."
		},
		{
			username: "isabeltorres1986",
			name: "Isabel Torres",
			image: "https://randomuser.me/api/portraits/women/4.jpg",
			email: "isabel@example.com",
			created_at: new Date("2023-01-08"),
			description: "Tengo 38 años y soy enfermera en un hospital. \nAmo mi trabajo y ayudar a los demás. \nEn mi tiempo libre, disfruto de la jardinería y la lectura de novelas románticas."
		},
		{
			username: "diegoramirez1981",
			name: "Diego Ramírez",
			image: "https://randomuser.me/api/portraits/men/5.jpg",
			email: "diego@example.com",
			created_at: new Date("2023-01-09"),
			description: "Soy Diego, tengo 43 años. \nTrabajo como chef en un restaurante gourmet. \nMe encanta experimentar con nuevos sabores y técnicas culinarias."
		},
		{
			username: "carmendiaz1979",
			name: "Carmen Díaz",
			image: "https://randomuser.me/api/portraits/women/5.jpg",
			email: "carmen@example.com",
			created_at: new Date("2023-01-10"),
			description: "Tengo 45 años y soy arquitecta. \nMe apasiona diseñar espacios funcionales y estéticos. \nEn mi tiempo libre, disfruto de la pintura y la fotografía de paisajes."
		},
		{
			username: "fernandoherrera1975",
			name: "Fernando Herrera",
			image: "https://randomuser.me/api/portraits/men/6.jpg",
			email: "fernando@example.com",
			created_at: new Date("2023-01-11"),
			description: "Me llamo Fernando, tengo 49 años. \nSoy economista y trabajo en un banco internacional. \nDisfruto de la lectura de libros de economía y jugando al ajedrez."
		},
		{
			username: "patriciacastro1984",
			name: "Patricia Castro",
			image: "https://randomuser.me/api/portraits/women/6.jpg",
			email: "patricia@example.com",
			created_at: new Date("2023-01-12"),
			description: "Soy Patricia, tengo 40 años. \nTrabajo como publicista en una agencia de marketing. \nMe encanta la creatividad y la innovación en mi trabajo, y disfruto de la pintura en mi tiempo libre."
		},
		{
			username: "raulromero1978",
			name: "Raúl Romero",
			image: "https://randomuser.me/api/portraits/men/7.jpg",
			email: "raul@example.com",
			created_at: new Date("2023-01-13"),
			description: "Tengo 46 años y soy músico profesional. \nToco el piano y doy clases particulares. \nLa música es mi vida, y en mi tiempo libre disfruto componiendo nuevas melodías."
		},
		{
			username: "teresaortega1989",
			name: "Teresa Ortega",
			image: "https://randomuser.me/api/portraits/women/7.jpg",
			email: "teresa@example.com",
			created_at: new Date("2023-01-14"),
			description: "Soy Teresa, tengo 35 años. \nTrabajo como veterinaria en una clínica. \nAmo los animales y disfruto cuidándolos. En mi tiempo libre, me gusta hacer senderismo."
		},
		{
			username: "albertosilva1983",
			name: "Alberto Silva",
			image: "https://randomuser.me/api/portraits/men/8.jpg",
			email: "alberto@example.com",
			created_at: new Date("2023-01-15"),
			description: "Tengo 41 años y soy desarrollador de software. \nMe apasiona la tecnología y crear soluciones innovadoras. \nEn mi tiempo libre, disfruto jugando videojuegos y aprendiendo cosas nuevas."
		},
		{
			username: "monicadelgado1982",
			name: "Mónica Delgado",
			image: "https://randomuser.me/api/portraits/women/8.jpg",
			email: "monica@example.com",
			created_at: new Date("2023-01-16"),
			description: "Soy Mónica, tengo 42 años. \nTrabajo como maestra de primaria. \nMe encanta enseñar a los niños y ver cómo crecen y aprenden. En mi tiempo libre, disfruto leyendo y haciendo manualidades."
		},
		{
			username: "sergiomorales1985",
			name: "Sergio Morales",
			image: "https://randomuser.me/api/portraits/men/9.jpg",
			email: "sergio@example.com",
			created_at: new Date("2023-01-17"),
			description: "Tengo 39 años y soy diseñador de interiores. \nMe encanta transformar espacios y hacerlos únicos. \nEn mi tiempo libre, disfruto de la fotografía y el cine."
		},
		{
			username: "gloriapena1980",
			name: "Gloria Peña",
			image: "https://randomuser.me/api/portraits/women/9.jpg",
			email: "gloria@example.com",
			created_at: new Date("2023-01-18"),
			description: "Soy Gloria, tengo 44 años. \nTrabajo como traductora de inglés y francés. \nMe encanta la literatura y disfruto leyendo libros en su idioma original."
		},
		{
			username: "andresmendez1977",
			name: "Andrés Méndez",
			image: "https://randomuser.me/api/portraits/men/10.jpg",
			email: "andres@example.com",
			created_at: new Date("2023-01-19"),
			description: "Tengo 47 años y soy consultor financiero. \nAyudo a las empresas a tomar decisiones estratégicas. \nEn mi tiempo libre, me gusta correr y disfrutar de la naturaleza."
		},
		{
			username: "claudiaaguirre1986",
			name: "Claudia Aguirre",
			image: "https://randomuser.me/api/portraits/women/10.jpg",
			email: "claudia@example.com",
			created_at: new Date("2023-01-20"),
			description: "Soy Claudia, tengo 38 años. \nTrabajo como psicóloga en una clínica privada. \nDisfruto ayudando a las personas a superar sus desafíos. En mi tiempo libre, me gusta practicar yoga y leer libros de autoayuda."
		}
	]);

	await db.insert(Posts).values([
		{
			user_id: 1,
			body: "Explorando nuevas ideas para el próximo proyecto, hay tanto que quiero compartir y aprender de esta comunidad increíble.",
			created_at: new Date("2023-09-01")
	},
	{
			user_id: 2,
			body: "Hoy ha sido un día largo, pero muy productivo. Logré avanzar mucho en mi trabajo y me siento satisfecho con el progreso.",
			created_at: new Date("2023-09-02")
	},
	{
			user_id: 3,
			body: "Disfrutando de una tarde tranquila con un buen libro. A veces, necesitamos un tiempo para desconectar y recargar energías.",
			created_at: new Date("2023-09-03")
	},
	{
			user_id: 4,
			body: "La naturaleza es realmente impresionante. Hoy fui de excursión y las vistas eran simplemente espectaculares. Definitivamente, lo repetiré pronto.",
			created_at: new Date("2023-09-04")
	},
	{
			user_id: 5,
			body: "Me encanta la música en vivo, la energía de los conciertos es algo que no se puede describir con palabras. ¡Qué gran noche!",
			created_at: new Date("2023-09-05")
	},
	{
			user_id: 6,
			body: "Estoy agradecido por las pequeñas cosas de la vida, esas que a menudo damos por sentadas pero que realmente hacen la diferencia.",
			created_at: new Date("2023-09-06")
	},
	{
			user_id: 7,
			body: "Aprendiendo algo nuevo cada día. Hoy me di cuenta de que nunca es tarde para expandir nuestros conocimientos y habilidades.",
			created_at: new Date("2023-09-07")
	},
	{
			user_id: 8,
			body: "Hoy descubrí un café local increíble. No solo el café era delicioso, sino que el ambiente era perfecto para trabajar y relajarse.",
			created_at: new Date("2023-09-08")
	},
	{
			user_id: 9,
			body: "Las amistades verdaderas son invaluables. Estoy tan agradecido por las personas maravillosas que tengo en mi vida.",
			created_at: new Date("2023-09-09")
	},
	{
			user_id: 10,
			body: "El ejercicio es realmente un cambio de vida. Desde que comencé a ser más activo, me siento más saludable y lleno de energía.",
			created_at: new Date("2023-09-10")
	},
	{
			user_id: 11,
			body: "A veces, solo necesitamos un momento de tranquilidad para reflexionar y realinear nuestros pensamientos. Hoy fue uno de esos días.",
			created_at: new Date("2023-09-11")
	},
	{
			user_id: 12,
			body: "El arte es una forma increíble de expresión. Hoy me sentí inspirado para crear algo nuevo y estoy muy contento con el resultado.",
			created_at: new Date("2023-09-12")
	},
	{
			user_id: 13,
			body: "La tecnología sigue sorprendiéndome. Hay tantas innovaciones que nos están llevando hacia un futuro más conectado y eficiente.",
			created_at: new Date("2023-09-13")
	},
	{
			user_id: 14,
			body: "Hoy fue un día de cocina en casa. Probé una receta nueva y resultó ser todo un éxito. ¡Definitivamente la repetiré!",
			created_at: new Date("2023-09-14")
	},
	{
			user_id: 15,
			body: "La familia es lo más importante. Pasar tiempo con mis seres queridos me llena de felicidad y gratitud.",
			created_at: new Date("2023-09-15")
	},
	{
			user_id: 16,
			body: "El cine siempre ha sido una de mis pasiones. Hoy vi una película que me dejó pensando mucho, ¡qué gran historia!",
			created_at: new Date("2023-09-16")
	},
	{
			user_id: 17,
			body: "La vida es un viaje constante de aprendizaje. Hoy me enfrenté a un desafío y aunque fue difícil, estoy agradecido por la lección.",
			created_at: new Date("2023-09-17")
	},
	{
			user_id: 18,
			body: "Me encanta viajar y descubrir nuevos lugares. Cada lugar tiene su propia magia y algo único que ofrecer.",
			created_at: new Date("2023-09-18")
	},
	{
			user_id: 19,
			body: "Hoy fue un día de relax total. A veces, es necesario desconectar y simplemente disfrutar del momento presente.",
			created_at: new Date("2023-09-19")
	},
	{
			user_id: 20,
			body: "El trabajo en equipo es fundamental. Hoy tuve una excelente colaboración con mis compañeros y logramos grandes cosas juntos.",
			created_at: new Date("2023-09-20")
	},
	{
			user_id: 1,
			body: "La lectura es uno de mis pasatiempos favoritos. Hoy terminé un libro que me mantuvo enganchado desde la primera página.",
			created_at: new Date("2023-09-21")
	},
	{
			user_id: 2,
			body: "La música tiene el poder de cambiar nuestro estado de ánimo. Hoy escuché una canción que realmente me levantó el ánimo.",
			created_at: new Date("2023-09-22")
	},
	{
			user_id: 3,
			body: "Apreciar las pequeñas cosas en la vida es clave para la felicidad. Hoy tuve un día simple, pero lleno de momentos significativos.",
			created_at: new Date("2023-09-23")
	},
	{
			user_id: 4,
			body: "La creatividad es una herramienta poderosa. Hoy estuve trabajando en un proyecto y la inspiración fluyó sin esfuerzo.",
			created_at: new Date("2023-09-24")
	},
	{
			user_id: 5,
			body: "El deporte es una excelente manera de mantener el cuerpo y la mente en forma. Hoy tuve una sesión de entrenamiento increíble.",
			created_at: new Date("2023-09-25")
	},
	{
			user_id: 6,
			body: "Hoy fue un día de reflexión. A veces, es necesario parar y pensar en dónde estamos y hacia dónde queremos ir.",
			created_at: new Date("2023-09-26")
	},
	{
			user_id: 7,
			body: "La naturaleza es mi lugar de escape. Hoy pasé un tiempo al aire libre y me sentí completamente renovado.",
			created_at: new Date("2023-09-27")
	},
	{
			user_id: 8,
			body: "Hoy estuve trabajando en un proyecto personal y me siento muy orgulloso del progreso que he hecho hasta ahora.",
			created_at: new Date("2023-09-28")
	},
	{
			user_id: 9,
			body: "Las conexiones humanas son lo que realmente importa en la vida. Hoy tuve una conversación profunda que me hizo pensar mucho.",
			created_at: new Date("2023-09-29")
	},
	{
			user_id: 10,
			body: "El aprendizaje constante es la clave del crecimiento. Hoy aprendí algo nuevo y estoy emocionado de seguir explorando este tema.",
			created_at: new Date("2023-09-30")
	},
	{
			user_id: 11,
			body: "Hoy fue un día de descanso total. A veces, es necesario simplemente relajarse y no hacer nada para recargar las energías.",
			created_at: new Date("2023-10-01")
	},
	{
			user_id: 12,
			body: "La tecnología avanza a pasos agigantados. Hoy descubrí una nueva herramienta que estoy deseando incorporar en mi trabajo.",
			created_at: new Date("2023-10-02")
	},
	{
			user_id: 13,
			body: "Las experiencias compartidas son las que más valor tienen. Hoy pasé un tiempo increíble con amigos y creamos recuerdos inolvidables.",
			created_at: new Date("2023-10-03")
	},
	{
			user_id: 14,
			body: "El arte culinario es fascinante. Hoy intenté una nueva receta y aunque fue un reto, el resultado fue delicioso.",
			created_at: new Date("2023-10-04")
	},
	{
			user_id: 15,
			body: "Hoy me di cuenta de la importancia de la gratitud. Agradecer por lo que tenemos nos ayuda a ver la vida con otros ojos.",
			created_at: new Date("2023-10-05")
	},
	{
			user_id: 16,
			body: "El cine es una ventana a otros mundos. Hoy vi una película que me transportó a otra realidad y me hizo reflexionar mucho.",
			created_at: new Date("2023-10-06")
	},
	{
			user_id: 17,
			body: "La superación personal es un camino continuo. Hoy logré alcanzar una meta que me había propuesto hace tiempo y me siento increíble.",
			created_at: new Date("2023-10-07")
	},
	{
			user_id: 18,
			body: "Viajar nos abre la mente a nuevas culturas y experiencias. Hoy recordé mi último viaje y me di cuenta de cuánto aprendí de él.",
			created_at: new Date("2023-10-08")
	},
	{
			user_id: 19,
			body: "El equilibrio entre trabajo y vida personal es fundamental. Hoy dediqué tiempo a mis hobbies y me siento mucho más relajado.",
			created_at: new Date("2023-10-09")
	},
	{
			user_id: 20,
			body: "El trabajo en equipo es esencial para el éxito. Hoy tuvimos una sesión de brainstorming increíble y surgieron ideas brillantes.",
			created_at: new Date("2023-10-10")
	},
		{
			user_id: 5,
			commented_post_id: 17,
			is_comment: true,
			body: "Me encanta cómo se expresa en este post. Realmente refleja mis pensamientos sobre el tema.",
			created_at: new Date("2023-10-12T14:30:00Z")
		},
		{
			user_id: 12,
			commented_post_id: 4,
			is_comment: true,
			body: "¡Gran post! Muy inspirador y me ha hecho reflexionar sobre varias cosas importantes.",
			created_at: new Date("2023-10-15T09:12:00Z")
		},
		{
			user_id: 8,
			commented_post_id: 22,
			is_comment: true,
			body: "No estoy de acuerdo con lo que se menciona aquí, creo que hay otros puntos de vista a considerar.",
			created_at: new Date("2023-10-18T16:45:00Z")
		},
		{
			user_id: 16,
			commented_post_id: 31,
			is_comment: true,
			body: "Este tema siempre me ha interesado, gracias por compartir tu opinión tan bien fundamentada.",
			created_at: new Date("2023-10-20T11:22:00Z")
		},
		{
			user_id: 3,
			commented_post_id: 7,
			is_comment: true,
			body: "Increíble cómo lograste plasmar una idea tan compleja de manera tan sencilla y directa.",
			created_at: new Date("2023-10-21T18:30:00Z")
		},
		{
			user_id: 19,
			commented_post_id: 14,
			is_comment: true,
			body: "Estoy impresionado con la claridad de este post, realmente es algo que todos deberíamos leer.",
			created_at: new Date("2023-10-24T07:50:00Z")
		},
		{
			user_id: 7,
			commented_post_id: 10,
			is_comment: true,
			body: "Totalmente de acuerdo con lo que dices aquí, es algo que he estado pensando por un tiempo.",
			created_at: new Date("2023-10-25T13:05:00Z")
		},
		{
			user_id: 13,
			commented_post_id: 29,
			is_comment: true,
			body: "Este post me ha motivado a hacer cambios en mi vida, gracias por compartir esta perspectiva.",
			created_at: new Date("2023-10-27T10:15:00Z")
		},
		{
			user_id: 2,
			commented_post_id: 36,
			is_comment: true,
			body: "Es sorprendente cómo una publicación puede hacerte ver las cosas desde otro ángulo.",
			created_at: new Date("2023-10-30T16:22:00Z")
		},
		{
			user_id: 10,
			commented_post_id: 5,
			is_comment: true,
			body: "No estoy seguro de estar de acuerdo con todo, pero sin duda es un punto de vista interesante.",
			created_at: new Date("2023-11-02T08:40:00Z")
		},
		{
			user_id: 15,
			commented_post_id: 19,
			is_comment: true,
			body: "Este tipo de discusiones son necesarias, gracias por traer esto a la mesa.",
			created_at: new Date("2023-11-04T12:55:00Z")
		},
		{
			user_id: 9,
			commented_post_id: 25,
			is_comment: true,
			body: "Nunca había pensado en este tema de esta manera, realmente me has hecho reflexionar.",
			created_at: new Date("2023-11-06T14:35:00Z")
		},
		{
			user_id: 18,
			commented_post_id: 32,
			is_comment: true,
			body: "Aprecio mucho el esfuerzo que pones en compartir tu conocimiento con nosotros.",
			created_at: new Date("2023-11-08T19:47:00Z")
		},
		{
			user_id: 11,
			commented_post_id: 2,
			is_comment: true,
			body: "Este post me ha dejado pensando toda la tarde, realmente una buena reflexión.",
			created_at: new Date("2023-11-10T15:30:00Z")
		},
		{
			user_id: 1,
			commented_post_id: 9,
			is_comment: true,
			body: "Me gusta la forma en que abordas este tema, es algo que no se ve todos los días.",
			created_at: new Date("2023-11-12T07:45:00Z")
		},
		{
			user_id: 14,
			commented_post_id: 37,
			is_comment: true,
			body: "Gracias por compartir tus ideas, este tipo de post son los que hacen falta.",
			created_at: new Date("2023-11-14T13:50:00Z")
		},
		{
			user_id: 6,
			commented_post_id: 28,
			is_comment: true,
			body: "Es interesante cómo este post aborda un tema tan complejo de una manera tan accesible.",
			created_at: new Date("2023-11-16T09:10:00Z")
		},
		{
			user_id: 20,
			commented_post_id: 15,
			is_comment: true,
			body: "No suelo comentar en post, pero este realmente me ha llamado la atención.",
			created_at: new Date("2023-11-18T11:55:00Z")
		},
		{
			user_id: 4,
			commented_post_id: 35,
			is_comment: true,
			body: "La claridad de este post es impresionante, gracias por compartir tu conocimiento.",
			created_at: new Date("2023-11-20T17:40:00Z")
		},
		{
			user_id: 17,
			commented_post_id: 8,
			is_comment: true,
			body: "Nunca había visto este tema desde esta perspectiva, es algo que vale la pena considerar.",
			created_at: new Date("2023-11-22T13:30:00Z")
		},
		{
			user_id: 5,
			commented_post_id: 16,
			is_comment: true,
			body: "Este post es justo lo que necesitaba leer hoy, gracias por tomarte el tiempo de escribirlo.",
			created_at: new Date("2023-11-24T10:20:00Z")
		},
		{
			user_id: 12,
			commented_post_id: 34,
			is_comment: true,
			body: "Me ha sorprendido gratamente este post, definitivamente algo que compartiré con amigos.",
			created_at: new Date("2023-11-26T14:50:00Z")
		},
		{
			user_id: 8,
			commented_post_id: 1,
			is_comment: true,
			body: "Estoy impresionado con la profundidad de este post, realmente una lectura recomendada.",
			created_at: new Date("2023-11-28T08:45:00Z")
		},
		{
			user_id: 16,
			commented_post_id: 26,
			is_comment: true,
			body: "Es muy raro encontrar post tan bien fundamentados como este, muchas gracias.",
			created_at: new Date("2023-11-30T11:30:00Z")
		},
		{
			user_id: 3,
			commented_post_id: 12,
			is_comment: true,
			body: "Este post me ha dado mucho en qué pensar, gracias por compartir tu punto de vista.",
			created_at: new Date("2023-12-02T17:55:00Z")
		},
		{
			user_id: 19,
			commented_post_id: 20,
			is_comment: true,
			body: "Me ha gustado mucho este post, es algo que leeré más de una vez.",
			created_at: new Date("2023-12-04T19:10:00Z")
		},
		{
			user_id: 7,
			commented_post_id: 33,
			is_comment: true,
			body: "Increíble cómo este post toca un tema tan relevante de una manera tan clara.",
			created_at: new Date("2023-12-06T15:20:00Z")
		},
		{
			user_id: 13,
			commented_post_id: 13,
			is_comment: true,
			body: "Agradezco que compartas tu conocimiento con nosotros, este tipo de post son los que marcan la diferencia.",
			created_at: new Date("2023-12-08T13:55:00Z")
		},
		{
			user_id: 2,
			commented_post_id: 21,
			is_comment: true,
			body: "Este post me ha abierto los ojos a nuevas ideas, muchas gracias por compartir.",
			created_at: new Date("2023-12-10T14:30:00Z")
		},
		{
			user_id: 10,
			commented_post_id: 30,
			is_comment: true,
			body: "No siempre comento en posts, pero este realmente merece reconocimiento.",
			created_at: new Date("2023-12-12T18:40:00Z")
		},
		{
			user_id: 15,
			commented_post_id: 24,
			is_comment: true,
			body: "Estoy impresionado con la claridad y profundidad de este post, muy bien hecho.",
			created_at: new Date("2023-12-14T09:35:00Z")
		},
		{
			user_id: 9,
			commented_post_id: 3,
			is_comment: true,
			body: "Este post es justo lo que necesitaba leer hoy, gracias por tomarte el tiempo de escribirlo.",
			created_at: new Date("2023-12-16T11:15:00Z")
		},
		{
			user_id: 18,
			commented_post_id: 11,
			is_comment: true,
			body: "Es impresionante cómo este post aborda un tema tan importante de manera tan accesible.",
			created_at: new Date("2023-12-18T14:40:00Z")
		},
		{
			user_id: 11,
			commented_post_id: 6,
			is_comment: true,
			body: "Este tipo de posts son los que hacen falta en las redes, gracias por compartir tus ideas.",
			created_at: new Date("2023-12-20T17:30:00Z")
		},
		{
			user_id: 1,
			commented_post_id: 18,
			is_comment: true,
			body: "Este post me ha dejado pensando durante horas, realmente un tema que merece más atención.",
			created_at: new Date("2023-12-22T12:50:00Z")
		},
		{
			user_id: 14,
			commented_post_id: 27,
			is_comment: true,
			body: "Nunca había visto este tema desde esta perspectiva, es algo que vale la pena considerar.",
			created_at: new Date("2023-12-24T16:35:00Z")
		},
		{
			user_id: 6,
			commented_post_id: 23,
			is_comment: true,
			body: "Estoy impresionado con la claridad de este post, realmente es algo que todos deberíamos leer.",
			created_at: new Date("2023-12-26T10:20:00Z")
		},
		{
			user_id: 20,
			commented_post_id: 38,
			is_comment: true,
			body: "Es sorprendente cómo una publicación puede hacerte ver las cosas desde otro ángulo.",
			created_at: new Date("2023-12-28T09:45:00Z")
		},
		{
			user_id: 4,
			commented_post_id: 39,
			is_comment: true,
			body: "Gracias por compartir tus ideas, este tipo de post son los que hacen falta.",
			created_at: new Date("2023-12-30T14:30:00Z")
		},
		{
			user_id: 17,
			commented_post_id: 40,
			is_comment: true,
			body: "Este post me ha motivado a hacer cambios en mi vida, gracias por compartir esta perspectiva.",
			created_at: new Date("2024-01-01T18:40:00Z")
		},
		{
			user_id: 5,
			commented_post_id: 10,
			is_comment: true,
			body: "Me ha gustado mucho este post, es algo que leeré más de una vez.",
			created_at: new Date("2024-01-03T13:10:00Z")
		}
	
	])

	await db.insert(Likes).values([
		{
			post_id: 1,
			user_id: 5,
			created_at: new Date("2023-10-01")
		},
		{
			post_id: 2,
			user_id: 12,
			created_at: new Date("2023-10-01")
		},
		{
			post_id: 3,
			user_id: 8,
			created_at: new Date("2023-10-01")
		},
		{
			post_id: 4,
			user_id: 19,
			created_at: new Date("2023-10-01")
		},
		{
			post_id: 5,
			user_id: 3,
			created_at: new Date("2023-10-01")
		},
		{
			post_id: 6,
			user_id: 15,
			created_at: new Date("2023-10-01")
		},
		{
			post_id: 7,
			user_id: 9,
			created_at: new Date("2023-10-02")
		},
		{
			post_id: 8,
			user_id: 2,
			created_at: new Date("2023-10-02")
		},
		{
			post_id: 9,
			user_id: 13,
			created_at: new Date("2023-10-02")
		},
		{
			post_id: 10,
			user_id: 18,
			created_at: new Date("2023-10-02")
		},
		{
			post_id: 11,
			user_id: 6,
			created_at: new Date("2023-10-02")
		},
		{
			post_id: 12,
			user_id: 17,
			created_at: new Date("2023-10-02")
		},
		{
			post_id: 13,
			user_id: 11,
			created_at: new Date("2023-10-02")
		},
		{
			post_id: 14,
			user_id: 4,
			created_at: new Date("2023-10-02")
		},
		{
			post_id: 15,
			user_id: 1,
			created_at: new Date("2023-10-02")
		},
		{
			post_id: 16,
			user_id: 16,
			created_at: new Date("2023-10-02")
		},
		{
			post_id: 17,
			user_id: 7,
			created_at: new Date("2023-10-02")
		},
		{
			post_id: 18,
			user_id: 14,
			created_at: new Date("2023-10-02")
		},
		{
			post_id: 20,
			user_id: 20,
			created_at: new Date("2023-10-03")
		},
		{
			post_id: 21,
			user_id: 3,
			created_at: new Date("2023-10-03")
		},
		{
			post_id: 22,
			user_id: 12,
			created_at: new Date("2023-10-03")
		},
		{
			post_id: 23,
			user_id: 8,
			created_at: new Date("2023-10-03")
		},
		{
			post_id: 24,
			user_id: 19,
			created_at: new Date("2023-10-03")
		},
		{
			post_id: 25,
			user_id: 5,
			created_at: new Date("2023-10-03")
		},
		{
			post_id: 26,
			user_id: 15,
			created_at: new Date("2023-10-03")
		},
		{
			post_id: 27,
			user_id: 9,
			created_at: new Date("2023-10-03")
		},
		{
			post_id: 28,
			user_id: 2,
			created_at: new Date("2023-10-03")
		},
		{
			post_id: 29,
			user_id: 13,
			created_at: new Date("2023-10-03")
		},
		{
			post_id: 30,
			user_id: 18,
			created_at: new Date("2023-10-04")
		},
		{
			post_id: 31,
			user_id: 6,
			created_at: new Date("2023-10-04")
		},
		{
			post_id: 32,
			user_id: 17,
			created_at: new Date("2023-10-04")
		},
		{
			post_id: 33,
			user_id: 11,
			created_at: new Date("2023-10-04")
		},
		{
			post_id: 34,
			user_id: 4,
			created_at: new Date("2023-10-04")
		},
		{
			post_id: 35,
			user_id: 1,
			created_at: new Date("2023-10-04")
		},
		{
			post_id: 36,
			user_id: 16,
			created_at: new Date("2023-10-04")
		},
		{
			post_id: 37,
			user_id: 7,
			created_at: new Date("2023-10-04")
		},
		{
			post_id: 38,
			user_id: 14,
			created_at: new Date("2023-10-04")
		},
		{
			post_id: 39,
			user_id: 10,
			created_at: new Date("2023-10-04")
		},
		{
			post_id: 40,
			user_id: 20,
			created_at: new Date("2023-10-04")
		},
		{
			post_id: 1,
			user_id: 2,
			created_at: new Date("2023-10-05")
		},
		{
			post_id: 2,
			user_id: 3,
			created_at: new Date("2023-10-05")
		},
		{
			post_id: 3,
			user_id: 4,
			created_at: new Date("2023-10-05")
		},
		{
			post_id: 4,
			user_id: 5,
			created_at: new Date("2023-10-05")
		},
		{
			post_id: 5,
			user_id: 6,
			created_at: new Date("2023-10-05")
		},
		{
			post_id: 6,
			user_id: 7,
			created_at: new Date("2023-10-05")
		},
		{
			post_id: 7,
			user_id: 8,
			created_at: new Date("2023-10-06")
		},
		{
			post_id: 8,
			user_id: 9,
			created_at: new Date("2023-10-06")
		},
		{
			post_id: 9,
			user_id: 10,
			created_at: new Date("2023-10-06")
		},
		{
			post_id: 10,
			user_id: 11,
			created_at: new Date("2023-10-06")
		},
		{
			post_id: 11,
			user_id: 12,
			created_at: new Date("2023-10-06")
		},
		{
			post_id: 12,
			user_id: 13,
			created_at: new Date("2023-10-06")
		},
		{
			post_id: 13,
			user_id: 14,
			created_at: new Date("2023-10-06")
		},
		{
			post_id: 14,
			user_id: 15,
			created_at: new Date("2023-10-06")
		},
		{
			post_id: 15,
			user_id: 16,
			created_at: new Date("2023-10-06")
		},
		{
			post_id: 16,
			user_id: 17,
			created_at: new Date("2023-10-06")
		},
		{
			post_id: 17,
			user_id: 18,
			created_at: new Date("2023-10-06")
		},
		{
			post_id: 18,
			user_id: 19,
			created_at: new Date("2023-10-07")
		},
		{
			post_id: 19,
			user_id: 20,
			created_at: new Date("2023-10-07")
		},
		{
			post_id: 20,
			user_id: 1,
			created_at: new Date("2023-10-07")
		},
		{
			post_id: 21,
			user_id: 5,
			created_at: new Date("2023-10-07")
		},
		{
			post_id: 22,
			user_id: 6,
			created_at: new Date("2023-10-07")
		},
		{
			post_id: 23,
			user_id: 7,
			created_at: new Date("2023-10-07")
		},
		{
			post_id: 24,
			user_id: 8,
			created_at: new Date("2023-10-07")
		},
		{
			post_id: 25,
			user_id: 9,
			created_at: new Date("2023-10-07")
		},
		{
			post_id: 26,
			user_id: 10,
			created_at: new Date("2023-10-07")
		},
		{
			post_id: 27,
			user_id: 11,
			created_at: new Date("2023-10-07")
		},
		{
			post_id: 28,
			user_id: 12,
			created_at: new Date("2023-10-07")
		},
		{
			post_id: 29,
			user_id: 13,
			created_at: new Date("2023-10-07")
		},
		{
			post_id: 30,
			user_id: 14,
			created_at: new Date("2023-10-08")
		},
		{
			post_id: 31,
			user_id: 15,
			created_at: new Date("2023-10-08")
		},
		{
			post_id: 32,
			user_id: 16,
			created_at: new Date("2023-10-08")
		},
		{
			post_id: 33,
			user_id: 17,
			created_at: new Date("2023-10-08")
		},
		{
			post_id: 34,
			user_id: 18,
			created_at: new Date("2023-10-08")
		},
		{
			post_id: 35,
			user_id: 19,
			created_at: new Date("2023-10-08")
		},
		{
			post_id: 36,
			user_id: 20,
			created_at: new Date("2023-10-08")
		},
		{
			post_id: 37,
			user_id: 1,
			created_at: new Date("2023-10-08")
		},
		{
			post_id: 38,
			user_id: 2,
			created_at: new Date("2023-10-08")
		},
		{
			post_id: 39,
			user_id: 3,
			created_at: new Date("2023-10-08")
		},
		{
			post_id: 40,
			user_id: 4,
			created_at: new Date("2023-10-08")
		}
	])

	await db.insert(Follows).values([
		{ followed_id: 1, follower_id: 2, followed_at: new Date("2023-11-10") },
		{ followed_id: 3, follower_id: 4, followed_at: new Date("2023-11-11") },
		{ followed_id: 5, follower_id: 6, followed_at: new Date("2023-11-12") },
		{ followed_id: 7, follower_id: 8, followed_at: new Date("2023-11-13") },
		{ followed_id: 9, follower_id: 10, followed_at: new Date("2023-11-14") },
		{ followed_id: 11, follower_id: 12, followed_at: new Date("2023-11-15") },
		{ followed_id: 13, follower_id: 14, followed_at: new Date("2023-11-16") },
		{ followed_id: 15, follower_id: 16, followed_at: new Date("2023-11-17") },
		{ followed_id: 17, follower_id: 18, followed_at: new Date("2023-11-18") },
		{ followed_id: 19, follower_id: 20, followed_at: new Date("2023-11-19") },
		{ followed_id: 2, follower_id: 1, followed_at: new Date("2023-11-20") },
		{ followed_id: 4, follower_id: 3, followed_at: new Date("2023-11-21") },
		{ followed_id: 6, follower_id: 5, followed_at: new Date("2023-11-22") },
		{ followed_id: 8, follower_id: 7, followed_at: new Date("2023-11-23") },
		{ followed_id: 10, follower_id: 9, followed_at: new Date("2023-11-24") },
		{ followed_id: 12, follower_id: 11, followed_at: new Date("2023-11-25") },
		{ followed_id: 14, follower_id: 13, followed_at: new Date("2023-11-26") },
		{ followed_id: 16, follower_id: 15, followed_at: new Date("2023-11-27") },
		{ followed_id: 18, follower_id: 17, followed_at: new Date("2023-11-28") },
		{ followed_id: 20, follower_id: 19, followed_at: new Date("2023-11-29") },
		{ followed_id: 1, follower_id: 3, followed_at: new Date("2023-11-30") },
		{ followed_id: 3, follower_id: 5, followed_at: new Date("2023-12-01") },
		{ followed_id: 5, follower_id: 7, followed_at: new Date("2023-12-02") },
		{ followed_id: 7, follower_id: 9, followed_at: new Date("2023-12-03") },
		{ followed_id: 9, follower_id: 11, followed_at: new Date("2023-12-04") },
		{ followed_id: 11, follower_id: 13, followed_at: new Date("2023-12-05") },
		{ followed_id: 13, follower_id: 15, followed_at: new Date("2023-12-06") },
		{ followed_id: 15, follower_id: 17, followed_at: new Date("2023-12-07") },
		{ followed_id: 17, follower_id: 19, followed_at: new Date("2023-12-08") },
		{ followed_id: 19, follower_id: 1, followed_at: new Date("2023-12-09") },
		{ followed_id: 2, follower_id: 4, followed_at: new Date("2023-12-10") },
		{ followed_id: 4, follower_id: 6, followed_at: new Date("2023-12-11") },
		{ followed_id: 6, follower_id: 8, followed_at: new Date("2023-12-12") },
		{ followed_id: 8, follower_id: 10, followed_at: new Date("2023-12-13") },
		{ followed_id: 10, follower_id: 12, followed_at: new Date("2023-12-14") },
		{ followed_id: 12, follower_id: 14, followed_at: new Date("2023-12-15") },
		{ followed_id: 14, follower_id: 16, followed_at: new Date("2023-12-16") },
		{ followed_id: 16, follower_id: 18, followed_at: new Date("2023-12-17") },
		{ followed_id: 18, follower_id: 20, followed_at: new Date("2023-12-18") },
		{ followed_id: 20, follower_id: 2, followed_at: new Date("2023-12-19") },
		{ followed_id: 3, follower_id: 1, followed_at: new Date("2023-12-20") },
		{ followed_id: 5, follower_id: 3, followed_at: new Date("2023-12-21") },
		{ followed_id: 7, follower_id: 5, followed_at: new Date("2023-12-22") },
		{ followed_id: 9, follower_id: 7, followed_at: new Date("2023-12-23") },
		{ followed_id: 11, follower_id: 9, followed_at: new Date("2023-12-24") },
		{ followed_id: 13, follower_id: 11, followed_at: new Date("2023-12-25") },
		{ followed_id: 15, follower_id: 13, followed_at: new Date("2023-12-26") },
		{ followed_id: 17, follower_id: 15, followed_at: new Date("2023-12-27") },
		{ followed_id: 19, follower_id: 17, followed_at: new Date("2023-12-28") },
		{ followed_id: 1, follower_id: 19, followed_at: new Date("2023-12-29") },
		{ followed_id: 2, follower_id: 3, followed_at: new Date("2023-12-30") },
		{ followed_id: 4, follower_id: 5, followed_at: new Date("2024-01-01") },
		{ followed_id: 6, follower_id: 7, followed_at: new Date("2024-01-02") },
		{ followed_id: 8, follower_id: 9, followed_at: new Date("2024-01-03") },
		{ followed_id: 10, follower_id: 11, followed_at: new Date("2024-01-04") },
		{ followed_id: 12, follower_id: 13, followed_at: new Date("2024-01-05") },
		{ followed_id: 14, follower_id: 15, followed_at: new Date("2024-01-06") },
		{ followed_id: 16, follower_id: 17, followed_at: new Date("2024-01-07") },
		{ followed_id: 18, follower_id: 19, followed_at: new Date("2024-01-08") },
		{ followed_id: 20, follower_id: 1, followed_at: new Date("2024-01-09") },
		{ followed_id: 3, follower_id: 2, followed_at: new Date("2024-01-10") },
		{ followed_id: 5, follower_id: 4, followed_at: new Date("2024-01-11") },
		{ followed_id: 7, follower_id: 6, followed_at: new Date("2024-01-12") },
		{ followed_id: 9, follower_id: 8, followed_at: new Date("2024-01-13") },
		{ followed_id: 11, follower_id: 10, followed_at: new Date("2024-01-14") },
		{ followed_id: 13, follower_id: 12, followed_at: new Date("2024-01-15") },
		{ followed_id: 15, follower_id: 14, followed_at: new Date("2024-01-16") },
		{ followed_id: 17, follower_id: 16, followed_at: new Date("2024-01-17") },
		{ followed_id: 19, follower_id: 18, followed_at: new Date("2024-01-18") },
		{ followed_id: 2, follower_id: 20, followed_at: new Date("2024-01-19") },
		{ followed_id: 4, follower_id: 1, followed_at: new Date("2024-01-20") },
		{ followed_id: 6, follower_id: 2, followed_at: new Date("2024-01-21") },
		{ followed_id: 8, follower_id: 3, followed_at: new Date("2024-01-22") },
		{ followed_id: 10, follower_id: 4, followed_at: new Date("2024-01-23") },
		{ followed_id: 12, follower_id: 5, followed_at: new Date("2024-01-24") },
		{ followed_id: 14, follower_id: 6, followed_at: new Date("2024-01-25") },
		{ followed_id: 16, follower_id: 7, followed_at: new Date("2024-01-26") },
		{ followed_id: 18, follower_id: 8, followed_at: new Date("2024-01-27") },
		{ followed_id: 20, follower_id: 9, followed_at: new Date("2024-01-28") },
		{ followed_id: 3, follower_id: 10, followed_at: new Date("2024-01-29") },
		{ followed_id: 5, follower_id: 11, followed_at: new Date("2024-01-30") },
		{ followed_id: 7, follower_id: 12, followed_at: new Date("2024-01-31") },
		{ followed_id: 9, follower_id: 13, followed_at: new Date("2024-02-01") },
		{ followed_id: 11, follower_id: 14, followed_at: new Date("2024-02-02") },
		{ followed_id: 13, follower_id: 15, followed_at: new Date("2024-02-03") },
		{ followed_id: 15, follower_id: 16, followed_at: new Date("2024-02-04") },
		{ followed_id: 17, follower_id: 18, followed_at: new Date("2024-02-05") },
		{ followed_id: 19, follower_id: 20, followed_at: new Date("2024-02-06") }
	])
}
