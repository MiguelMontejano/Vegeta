//Variables globales
const cuerpoApp = document.getElementById("cuerpo-app");
const zonaNombre = document.getElementById("texto-nombre");
const zonaTexto = document.getElementById("texto-juego");

const rondasPorPartida = 35;//Establece el numero de rondas que se juegan por partida
const tiposPruebas = 8;//Esta variable nos indica cuantos tipos diferentes de pruebas existen en el juego
/*------------------------------------------------------------------------------------------
Cada tipo de prueba esta asignada a un numero, lo que se usa en metodos como siguiente ronda
pruebas = 0              pruebas -> 20       Miguel Miguel Miguel Mimi Miguel Mimi Hugo Mimi Hugo Hugo
generales = 1            generales -> 13 (+1)
eleccion = 2 Amarillo    elegir -> 3 (+1)
duelos = 3 Rosa          duelos -> 3 (+1)     Miguel y Mimi - Mimi y Hugo - Mimi y Miguel - Miguel y Hugo
castigos = 4 Negro       castigos -> 3 (+1)   Hugo
preguntas = 5            preguntas -> 5 (+1)  Mimi Hugo
cultura = 6  Azul Oscuro cultura -> 1 (+1)
beberxbeber = 7          beberxbeber -> 2 (+1)
TOTAL = 8
AHORA MISMO SE JUEGAN 50 RONDAS PERO SE JUEGA UNA RONDA MAS DE CADA TIPO DE PRUEBA DE LAS QUE TENEMOS ESTIPULADAS, LO QUE HACE QUE ALGUNAS RONDAS DE ALGO NO SE JUEGUEN, LE DA ALGO DE ALEATORIEDAD AL JUEGO Y A MI ME GUSTA, NO SERÍA MUY DIFICIL DE ARREGLAR SI QUEREMOS, TIENE QUE VER CON LOS IF's QUE HAY DENTRO DE LOS IF DE CADA TIPO DE PRUEBA
picante = 8, para que este activado tendria que haber un boolean y el numero de cada pregunta por ronda ser distinto para incluir estas y que salgan bastante
-------------------------------------------------------------------------------------------*/

let contadorRondas;

let contadorPruebas = 0;
let contadorGenerales = 0;
let contadorEleccion = 0;
let contadorDuelos = 0;
let contadorCastigos = 0;
let contadorPreguntas = 0;
let contadorCultura = 0;
let contadorBeberxbeber = 0;

let arrayJugadores = [];

let pruebas = ["Di un recuerdo con cada uno de los aquí presentes y brinda por los buenos momentos", 
"Bebe el máximo de suspensos que hayas tenido, si es ninguno te solidarizas y bebes con el que más suspensos tiene", 
"Sube una historia con una encuesta y si gana la opción que elegiste reparte 3 tragos si pierdes bebe 3", 
"Tienes 3 esquivas, eso quiere decir que podrás saltarte 3 veces que te toque beber hasta el final de esta partida", 
"Sigue la canción que este sonando si no te la sabes bebe 3", 
"Si has tenido sexo esta semana reparte 2 tragos si llevas meses sin hacerlo bebe 2",
"Reparte 3 tragos si tienes el vaso en la mano", 
"Deberán darte un beso en la mejilla, por cada persona que lo haga beberás 1 trago", 
"Todo el que quiera podrá darte un azote, si te niegas bebes 5 y si no beberás 1 trago por cada persona que te haya dado", 
"Reparte 2 tragos  si estás planeando un viaje, si es con alguien que esté aquí que beba 2", 
"Pregúntale algo profundo al de tu derecha",
"¡QUE EL CALENDARIO TE ACOMPAÑE! Por cada mes de este año que lleves soltero bebe un trago",
"Si has tenido COVID-19 bebe 2, si nunca lo has tenido reparte 2 tragos", 
"Di como conociste a cada uno y brinda por ello", 
"Reparte 3 tragos si llevas una prenda rosa, verde o naranja", 
"Reparte 1 trago por cada accesorio que lleves, piercings, tattoos, pendientes y pulseras (cuentan una vez cada uno)", 
"Bebe un trago por cada año que lleves sin montar en Bicicleta, a partir de hoy puedes montar y evitar beber la próxima vez, recuerda que montar en bici nunca se olvida", 
"Reparte dos tragos si estás apuntado a la autoescuela", 
"Bebe 2 tragos si la canción que está sonando no te gusta", 
"Te toca recitar el inicio de llamado de emergencia, si no te lo sabes bebe 3, si te lo sabes reparte 6", 
"Reparte 4 tragos", 
"Bebe 2 tragos", 
"Bebe un trago por cada hermano o hermana que tengas",
"Si has tenido que cancelar algunas vacaciones/viaje por culpa del COVID bebe 2, si es con alguien de los aquí presentes brindad para ahogar las penas",
"Bebe 2 si alguna vez has robado",
"23 preguntas. El juego consiste en que deberás pensar en una persona (famosa o no) que todos los presentes conozcan. El resto entre todos podrán hacer 23 preguntas (tus respuestas pueden ser únicamente SI, NO o A VECES) para tratar de adivinar a esa persona. Si aciertan bebes tres, de lo contrario el resto bebe 1 cada uno", 
"Bebe 2 tragos si tienes un secreto con alguien de los aquí presentes",
"Llama a una persona del sexo opuesto y dile que te gustaría tener una cita con su madre/padre",
"Llama a una persona de tu elección, el resto de jugadores deben decidir cual será la temática de la llamada, esta debe durar dos minutos sin que te pillen la broma, si lo consigues tendrás 20 tragos para repartir",
"Hazte una foto haciendo la peineta y mándasela a quien digan tus amigos, si te niegas bebe 5 si lo haces reparte 5", 
"Cuenta un sueño erótico que hayas tenido, reparte 3", 
"Haz 10 sentadillas y reparte 4 tragos", 
"Haz 10 flexiones y reparte 4 tragos",
"Eres el francotirador de la fiesta, cuando quieras podrás disparar a otro jugador que beberá un tragp y se convertirá en el nuevo francotirador (guiñándole el ojo sin que el resto de jugadores se entere. Si te pillan serás de nuevo el francotirador y debes beber un trago).",
"Cuenta un chiste, si nadie se ríe bebe 4 tragos, si alguien se ríe bebe 2", 
"Imita a un animal con mímica el primero que lo adivine podrá repartir 5", 
"Enseña tu foto más vergonzosa si te niegas bebe 3", 
"Cántale una canción a la persona que tienes a tu derecha, si te niegas bebe 3", 
"Te deberán insultar durante 10 segundos en lo que tomas 4 sorbos", 
"Canciones encadenadas. El jugador comienza cantando una canción y cuando quiera parará, el jugador de su izquierda deberá cantar una canción con la última palabra dicha por tí y así hasta que uno repita o se quede sin ideas",
"Haz una pose ridícula y deja que tus amigos te hagan una foto, si te niegas bebes 4",
"Debes interpretar una canción únicamente dando palmas, si nadie lo acierta beberás 2 tragos. Si alguien lo acierta repartirá junto a tí 4 tragos a una única persona",
"Eres Athos, elige a un Porthos y a un Aramis, seréis los tres mosqueteros de aquí a diez minutos (pausar el contador cuando no estéis jugando o para ir al baño), cada vez que uno beba por vuestro juramento deberéis beber los tres a la voz de todos para uno y uno para todos. Un trago de mas por cada fallo.",
"Eres indiana jones, el resto esconderá sus pertenencias (llaves y cartera) por la sala en la que estéis, tú te irás para no verlo, tendrás un minuto desde que te avisen para encontrarlo. Por cada uno que encuentres repartes 3, por cada una que no encuentres bebes 2",
"Recita un padre nuestro completo, si lo sabes reparte 3 en nombre de Cristo, si no bebe 1 por ateo.",
"Eres la cenicienta, si son mas de las 00 bebes 4, si es antes de las 00 reparte 2.",
"Bebe un trago por cada año que llevas diciendo que te ibas a sacar el carné de conducir",
"Di cuáles son todas las fichas del Monopoly clásico, si lo consigues reparte 4",
"Reparte 2 tragos por cada pulsera que lleves si no tienes ninguna bebe 2",
"Haz con mímica una película, quién lo adivine repartirá 5",
"Haz el ruido de animal que el resto diga y además bebe 2",
"Patata Caliente: Debéis poner un temporizador de un minuto y medio y el jugador que ha salido deberá adivinar el número católicos en EEUU (los que llevan el tiempo que lo miren). El que adivina puede decir tantos números como quiera hasta dar con el correcto pero los demás jugadores solo le podrán decir más o menos. Suerte porque si lo consigues repartes 10",
"Habla con acento (el que quieras) y nos cuentas de qué trata la última serie que has visto. Añade palabras propias de ese acento para ver quién es capaz de adivinar de qué serie se trata, ese jugador repartirá 2 tragos",
/*SUPERPODERES*/
"Eres Spider-Man, puedes esquivar 10 tragos que te toquen, además puedes hacer uso de tus telarañas para salvar a cualquiera de los tragos que le mande otro jugador (obviamente se restarán de tu total de 10)",
"Eres la Barbie de la fiesta, todos te quieren y harán lo que quieras durante 5 minutos, si alguien se niega a hacer lo que le mandes beberá 1 trago cada vez que se niegue.",
/*ADIVINAR COSAS CON EMOTICONOS*/
"👶🍼👔💼 Adivina la película. Si fallas bebes 2, si aciertas los repartes.",
"👨‍🦲🏎💨 Adivina la película. Si fallas bebes 1 y si lo aciertas repartes 2",
"🧙‍♂💍💍🗡🐲 Adivina la película y si lo aciertas reparte 2. Pista: J.R.R. Tolkien",
"🤖🔄🚕 Adivina la película o beberás 1 trago",
"🕷🕸🤷 Adivina el superhéroe o bebe 2",
"🔎🐟 Adivina la película o bebe 2, si aciertas los repartes",
/*CANCIONES, POR SI NECESITAN UNA CATEGORIA A PARTE LAS SEPARO*/
"Y si te digo que el resto nos mira... Continúalo (las 6 palabras siguientes) correctamente o bebe 3 tragos ya que ella She dont Give A Fo",
"Aunque pierda esta gente se va a llenar de orgullo... Completa la barra o bebe 1 trago.",
"Te cambió siendo mejor que ella, Continúalo correctamente o bebe 2 tragos",
"Atrévete-te-te, salte del... Continúalo (las 5 palabras siguientes)",
"Antes era un pobre infeliz, ahora no soy... Completa la barra y si lo haces bien reparte 2",
"Una perra (mmm) sorprendente (uh)... Añade 5 palabras o bebe 1",
"Cuéntame, Tu despedida para mí fue dura... Completa la barra o bebe 1",
"Cada vez me importas menos Pues olvido cuando () Aunque sienta que me muero () () () () Medicina alternativa Tu () en mi (). Completa las palabras que faltan o bebe 2 tragos (cada () es una palabra).",
"Quiero rayos de sol () en la () y ver como se pone () () () y morena. Rellena los paréntesis con la palabra que corresponde y bebe un trago por cada uno que hayas fallado.",
"Antes que te vayas dame un beso... Añade las siguientes 6 palabras o bebe 2 tragos pero si aciertas reparte 2."
];

let generales = ["Mirar todos hacia abajo y a la de tres mira a alguien si coincides bebes 2", 
"El primero en decir la hora reparte 3 tragos",
"El porcentaje de batería más alto bebe 1 tragos", 
"El porcentaje de batería más bajo bebe 2 tragos",
"Los que lleven reloj beben 1 trago",
"Decir todos una canción y añadirla a la cola",
"Decid superpoderes que sean muy útiles tanto en tu trabajo como en la cama, el que repita o se quede sin ideas bebe 1 trago",
"Si tienes Spotify gratis bebe 2 por pobre, si lo tienes de pago reparte 2, si lo tienes pirata reparte 1 por pícaro",
"Los que tienen Amazon Prime reparten 1 trago, si pides con el de un familiar no cuenta",
"Di tu Pokémon favorito, si coincides con otro bebéis 2 tragos",
"Di tu Saga de películas favoritas si coincides con otro bebe 2 tragos",
"Olvidonas... Decid frases cutres para ligar, el que se quede sin ideas o repita bebe 2. A por ello fornicadores",
"Decid refranes populares. El que se quede sin ideas bebe 3 tragos. Empieza el lector de esta prueba",
"Hola vaqueros alcohólicos, ahora todos tendréis un revólver cargado con tantas balas como copas llevéis en el día de hoy. Cada bala que disparéis hará que beba la persona a la que apuntes un trago. Úsenlas bien.",
"Jugar a chinitos entre todos y al que le toque repartirá la suma total de dedos (no vale sacar más de 5 dedos)",
"Móviles al centro de la mesa boca arriba y con sonido, por cada mensaje a cualquiera bebereis un trago por cada uno",
"Si has fantaseado con la mami o el papi de algún amigo bebe 2 tragos",
"Esta es para los viejos. Por cada uno de los siguientes recursos que hayas usado beberás un trago: Ares, eMule, ElRinconDelVago, Tuenti, Megaupload",
"Esta es para los viejos V2. Por cada uno de los siguientes recursos que hayas usado beberás un trago: Musical.ly, Messenger, Playfulbet, JuegosJuegos.com, Flappy Bird",
"Si has fantaseado con un profesor bebe 2 tragos",
"Los que mezclan con Coca-Cola o Fanta sois gente de bien,si lo haces con marcas blancas toma 2 sorbos",
"Reparte 5 si eres un guerrero y mañana trabajas",
"Si tu pizza favorita es la barbacoa bebe 1, si es la carborana bebe 2, si te gusta la pizza con piña bebe 5",
"Bebed 2 tragos si estás jugando antes de salir de fiesta, si no invitad a más personas y montarla vosotros",
"Los aburridos que hayan dicho bajar la música o los sordos que dicen de subirla beben 3 tragos",
"Votad al más mentiroso, el elegido beberá 2",
"El último que haya llegado bebe 2 tragos",
"El más alto por jirafa reparte 2",
"Todos deberán elegir entre cara o cruz, tira una moneda si has fallado bebe 2 tragos aciertas reparte 1", 
"Si prefieres kebab reparte 2, si eres de durum reparte 1.",
"El más bajo bebe 2, tapón",
"El más inteligente bebe 2",
"Cosas que echamos de menos de la infancia o que eran mejores en ese tiempo, el que repita o se quede sin ideas que beba 2 tragos para volver a la niñez",
"Qué recibe mayor número de búsquedas en Google: Obesidad o Divorcios. Cada cual diga su respuesta y luego busquen la respuesta. Los que han fallado beben",
"¿Quién va mejor vestido/a hoy, la persona de tu izquierda o de tu derecha? Mójate y cada cual beberá un trago por cada persona que le haya dicho que viste mejor (como mucho puedes beber dos en esta ronda asi que no te quejes)",
"Reparte 2 tragos si has ido a más de 4 conciertos",
"Beber 2 tragos si alguna vez saliste en un periódico o televisión",
"Repartid 2 por cada libro que te hayas leído este año, nombrando título y autor",
"El más vacilón beberá el número de tragos como jugadores estén jugando, todos votan",
"2 mentiras y una verdad. Cada jugador dirá dos mentiras y una verdad sobre él/ella a la persona de su derecha, esta tendrá que detectar cuál es la verdad. Si pillan tu verdad bebes 1 trago, si no lo beberá la otra persona",
"Los menores reparten 2",
"DROGACICTOS, Sí has fumado María bebe 1, polen 2, si es hachís 3, si es algo más duro reparte 5",
"Bebe por cada vez que hayas pedido/comprado comida basura esta semana",
"Si bebes ron reparte 1, si es whisky bebe 2, si es Vodka reparte 3, si es Ginebra bebe 4",
"Si echas de menos o conoces el almirante ron del estudiante  bebe 2 tragos en su honor",
"Decir equipos de la liga española, el que se quede sin ideas bebe 2 tragos",
"Decir actores famosos, el que se quede sin ideas bebe 2 tragos",
"Decir actrices famosas, el que se quede sin ideas bebe 2 tragos",
"Por turnos nombrad raperos famosos, el que se quede sin ideas bebe 4 tragos",
"Mujeres sexys, el que se quede sin ideas bebe 1",
"Decir ciudades de España, el que se quede sin ideas bebe 2 tragos",
"Si el creador de la playlist que está sonando está aquí reparte 3, si no estáis escuchando ninguna Bebed todos y hay que ir pensando en crearse una, de nada",
"Bebe 3 tragos si tienes hora para irte a casa o tienes pensado irte antes de las 4, si alguien miente y no bebe en esta prueba pero se va antes de las cuatro el próximo día deberá empezar con hidalgo",
"De aquí hasta el final del juego prohibido pronunciar SI o NO, un trago por cada falta.",
"Cuales son las mejores promesas? Que todo el mundo responda, solo los que sepan cómo continua la frase podrán repartir 5 tragos.",
"Bebe si estás esperando la BZRP Session #23 de Paulo Londra.",
"Un trago por cada una de vuestras conquistas en Tinder",
"El mas agarrado respecto al dinero bebe 2, todos votan.",
"Cambio de música gente, que cada uno añada una canción a la cola que sea de un género distinto al que soléis poner de fiesta normalmente",
"A los que les encantan los dias de lluvia beben",
"A la de tres digan todos el artista que está sonando o uno de ellos, el que falle bebe. Si no tienen música bebed todos panda de amargados",
"3 verdades,\ndigan tres frases sobre el jugador de su derecha (si se conocen mucho no valen cosas obvias), deben intentar que todas sean verdad, el propio jugador juzgará, por cada frase falsa beberás, por cada una verdadera beberá él.",
"Tomense una foto señores, nada de beber por ahora. Haced alguna pose ridícula o graciosa no seáis aburridos/as.",
"El más rapero bebe, todos votan",
"Bebe 2 tragos si nunca has ido a una discoteca", 
"Votad al más cocinitas, este beberá 2",
"Los que más fiestas se hayan pegado juntos reparten 1 trago cada uno", 
"Bebe 2 tragos por cada suspenso en el último trimestre", 
"Reparte 1 trago por cada billete que tengas en la cartera, si no tienes ninguno además beberás 2", 
"Bebe en tragos el segundo dígito de puntos que lleve tu equipo en liga", 
"Bebe 2 tragos si hoy dijiste HOY NO BEBO",
"La persona más guapa de las que están jugando bebe, todos votan",
"Dos tragos para el/la que mejor viste, todos votan",
"Si tus fiestas favoritas son en las que se escucha Reggaeton reparte 2, si eres de Electrónica (EDM) reparte 4, si solo te gusta el Techno/Rock/Heavy/Indie... bebe 2",
"Los Otakus a los que les gusta el Anime beben (están exentos a los que les gusten Animes del tipo Doraemon, Inazuma Eleven o Dragon Ball)",
"Época de la NBA Pre-Jordan, todos los que tengan las zapatillas blancas serán multados con un trago.",
"Nunca es tarde para decir lo siento, si algunos de los presentes están enfadados y quieren hacer las paces es el momento, si sucede brindaremos por ello",
"Estáis en El Concilio de Elrond (El señor de los Anillos), quedan anulados todos los castigos y normas que había hasta el momento, además brindaréis en honor a Tolkien.",
"Desde aquí hasta el final de la partida el primero en decir pepino al acabar una canción repartirá 1 trago.",
"Buenas artistas. Debéis formar parejas (si sois impares un grupo de tres). Uno será el artista y otro el ojeador. Los artistas deberán agruparse lejos de los ojeadores y decidir entre ellos qué dibujará cada uno (cada uno algo diferente). Una vez hecho estó os volvéis a juntar y cada uno con su pareja tendrá 1 minuto para adivinar que está dibujando su artista (SIN PISTAS). Si adivina el resto de parejas beberán un trago",
"¿Quién es el más MDLR? El elegido Reparte 3",
"Cuatro nueves son capaces de dar 100 como resultado. ¿Cómo? El primero que responda correctamente reparte tantos tragos como personas haya jugando.",
"¡ADIVINANZA! Son doce señoras con medias, pero sin zapatos. ¿De quiénes se trata? El primero en responder correctamente (sin hacer trampas) que reparta 4 tragos."
];

/*Estas tienen que mantener este formato porque al final se les añade una cantidad de tragos random de manera automática*/
let eleccion = ["Papi gavi o Xokas \nla minoría bebe", 
"Ibai o Auronplay \nla minoría bebe", 
"Anuel o Bad Bunny \nla minoría bebe", 
"Cr7 o Messi \nla minoría bebe", 
"Duki o Paulo \nla minoría bebe", 
"Mamá o papá si no puedes elegir bebe 2 por buen hijo \nla minoría bebe",
"Que tus padres te vean manteniendo relaciones o ver a tus padres teniendo relaciones \nla minoría bebe", 
"Pasar un año a 40º o pasar un año a -10º;\nla minoría bebe", 
"Tener el cuello como una jirafa o tener la nariz como un elefante \nla minoría bebe", 
"Tener 3 piernas o tener 3 brazos \nla minoría bebe", 
"Pasar 5 años en la cárcel o 10 años en coma \nla minoría bebe", 
"No cambiarte la ropa en 1 mes o no ducharte en 1 mes \nla minoría bebe", 
"No llevar nunca más ropa interior o solo poder llevar ropa interior usada \nla minoría bebe", 
"Ser pobre junto al amor de tu vida o ser multimillonario sin conocer el amor \nla minoría bebe", 
"Saber qué día morirás o saber de qué morirás \nla minoría bebe", 
"Hablar como Yoda o respirar como Darth Vader \nla minoría bebe", 
"Poder volar o poder leer la mente \nla minoría bebe", 
"Poder volver al pasado o poder saber el futuro \nla minoría bebe", 
"Ganar 50.000 euros ahora mismo o que cada día te den 5 euros \nla minoría bebe", 
"No salir nunca de tu ciudad o salir pero no poder volver nunca más \nla minoría bebe",
"Rubias/os o morenas/os \nla minoría bebe",
"Bad Gyal o La Zowi \nla minoría bebe",
"Becky G o Natti Natasha \nla minoría bebe",
"Vegetta777 o Willy \nla minoría bebe", 
"Rafa Nadal o Federer \nla minoría bebe", 
"David broncano o Pablo Motos\nla minoría bebe", 
"Hitler o Stalin\nla minoría bebe", 
"Reggaeton o electrónica\nla minoría bebe", 
"Amador Rivas o Antonio recio\nla minoría bebe", 
"Apple o Microsoft\nla minoría bebe", 
"Capitán América o Iron man \nla minoría bebe", 
"Madrid o Barsa \nla minoría bebe", 
"Discoteca o casa/calle \nla minoría bebe", 
"Picina o playa \nla minoría bebe",
"Bad Bunny es el mejor reggaetonero de la actualidad. Voten SI o NO. La minoría bebe",
"¿Escuchas las sesiones de BZRP aunque no conozcas al artista? La minoría bebe",
"Pizza o hamburguesa \nla minoría bebe", 
"Comida China o Mexicana \nla minoría bebe", 
"FMS España o FMS argentina \nla minoría bebe", 
"Fútbol o Baloncesto \nla minoría bebe", 
"Patatas gajo o Patatas normales \nla minoría bebe", 
"Cerveza o refresco \nla minoría bebe", 
"Frío o calor \nla minoría bebe", 
"El juego del calamar o la casa de papel\n la minoría bebe",
"Ver fútbol o jugar al fútbol\n la minoría bebe",
"Tortilla de patata con o sin cebolla\n la minoría bebe",
"Piratas del Caribe o Harry Potter\n la minoría bebe",
"Películas o Series\n la minoría bebe",
"Burger King o Mc Donalds\n la minoría bebe",
"¿Se sale hoy de caza?\n la minoría bebe"
];

let duelos = ["Poner una alarma cada uno, cuando suene el otro se bebe la mitad de lo que tenga en ese momento", 
"El primer jugador es Thanos y el segundo es Iron man, cuando Thanos quiera podrá  chasquear los dedos y todos deberán beber la mitad de su vaso pero Iron Man puede detenerlo, bebiéndose junto a Thanos lo que les quede en el vaso o no sacrificarse por los suyos", 
"Deberán bailar un vals o bachata, si lo hacen reparten 10 tragos entre los dos",
"Pares y nones, el que pierda bebe 2",
"Juego de compenetración. Ambos jugadores deberán decir un número a la vez que esté entre el 1 y el 10, si coinciden reparten 10 tragos entre los dos si no coincide beben 2 tragos cada uno",
"Concurso de flexiones entre los jugadores, el que gane hará beber al otro 5 tragos.",
"Alejaos del resto de jugadores y cread una seña/código/palabra que deberéis hacer durante la partida sin que el resto de jugadores os pille dicha seña. Por cada vez que lo consigáis el resto beberá un trago, si os pillan cada uno deberéis beber 10 tragos. Cuando acabe la partida deberéis decir al resto cuál era la seña",
"Sois Chip y Chop. Por cada vez que uno de los dos hable el otro deberá beber 1 trago. Esta prueba dura 10 minutos así que por vustro bien cronometadlo.",
"Cambio de roles. Los jugadores intercambian sus nombres durante esta partida y lo que le corresponda beber a cada uno se le transferirá al otro y viceversa.",
"Ambos jugadores vais a beber un chupito, espero que esté bueno la verdad.",
"Los jugadores jugarán al juego de señalar, existen cuatro direcciones (arriba, abajo, izquierda y derecha), a la cuenta de tres (que sea rápida cada vez) uno de los jugadores apuntará en una dirección y el otro deberá mirar en la dirección opuesta a la que apunta el dedo, si lo consigue apuntará él y el otro jugador deberá hacer lo mismo, el primero que se equivoque bebe 5",
"Jugad a piedra papel o tijera, al mejor de tres, el que pierda bebe 4",
"El primer jugador es Romeo y el segundo Julieta. Julieta en muestra de su amor beberá en lugar de Romeo hasta el final de la partida. A cambio, Romeo se tomará todo lo que le quede en el vaso al final de la partida lleno de tristeza por su Julieta.",
"Batalla de rimas entre los jugadores, no os cortéis si no sabéis hacerlo, esto es para echarse unas risas",
"Buscad lo siguiente en YT: juego douglas costa dybala. Echad una partida entre los dos y que el resto haga de juez, el que pierda bebe 2",
"El lazarillo de Tormes. Preparad un circuito con obstáculos. El segundo jugador será ciego asi que vendadle los ojos. Deberá recorrer el circuito siguiendo las indicaciones de su compañero sin fallar. Si lo consiguen podrán hacer que otro jugador beba la mitad de lo que queda en su vaso. Si no lo conseguís beberéis entre los dos lo equivalente a medio vaso (1/4 cada uno)",
"Pulso chino entre los jugadores. El perdedor bebe 3 tragos",
"Pulso clásico entre los jugadores, el que gane hará que el otro jugador beba 4 tragos. En este punto otro de los jugadores de la partida puede interponerse para que el perdedor no beba, retando al ganador anterior a un pulso en el que el nuevo retador beberá el doble de tragos que tocaban si es que pierde, el otro jugador mantiene los tragos de su ronda. Cada jugador puede solo salvar a otro una vez.",
"El primer jugador deberá coger al segundo como una princesa, si no puede con él/ella deberá beber 4 tragos para ponerse más fuerte.",
"El jugador que salte más alto de los dos hará beberse al otro 2 tragos.",
"Pulso vasco entre los jugadores. El perdedor bebe 3. Si no aceptáis bebed 1 trago y seguimos jugando"
];

let castigos = ["Cambiaros todos de sitio, deberá ser durante toda la noche, el que no quiera Debera tomarse medio vaso", 
"Deberás elegir quién comprará los hielos el próximo día que juegueis a HOY NO BEBO  y además 2  tragos todos", 
"Habla como Xokas/Gallego hasta nuevo aviso",
"Eres Eminem, habla rimando durante 10 rondas, un trago por cada falta.",
"Habla como Mourinho durante 5 minutos.",
"En honor a Jack Sparrow, bebe un chupito directamente de la botella, esta prueba no te la puedes saltar de ninguna manera",
"Eres Bizarrap, busca una gorra y unas gafas y póntelas hasta que el resto de jugadores diga, si no encuentras tapate con lo que pilles.",
"Hola jugón, estoy encantadísimo de comunicarte que vas a exagerar todo lo que digas durante 10 ronditas. El resto vigilad que será un trago por cada falta.",
"De aquí al final del juego deberás acabar tus frases con algo que no tenga sentido.",
"No podrás parpadear durante 1 minuto",
"Llamar por teléfono a un familiar o amigo y hacerle una falsa confesión acordada por el grupo, si se la cree reparte 10 si no beberás 5",
"Eres Moisés, así que de aquí al final del juego podrás abrir en dos los mares y hacer que todo el mundo reduzca su vaso a la mitad",
"Eres el alcalde, tu tributo será el móvil/pc con el que se está jugando, tu serás el encargado de leer y pasar las pantallas, por cada una deberás beber dos tragos. Pero recuerden que esto es política, el resto de jugadores podrá sobornarte y beberlos en tu lugar cuando quieran (recuérdalo para devolverles el favor en caso de ser necesario) tras 5 rondas, habrá elecciones, en las que se elegirá otro presidente o te volverán a elegir a ti. Esto se repetirá 3 veces en la partida, es decir un total de 20 rondas. Después de eso se acabó la política.",
"Elimina 5 aplicaciones de tu teléfono o bebe 10 tragos",
"Todos deberéis dirigiros hacia quién habléis de manera despectiva. Daros caña un rato y un trago por cada falta.",
"2 Minutos sin apoyar el vaso en la mesa",
"Publica en la red social que quieras algo con temática elegida por el resto. Si es Instagram puedes subir una historia, si prefieres puedes poner un tweet, eso es elección tuya.",
"Si tu vaso está a menos de la mitad debes acabarlo, el resto comprobadlo",
"De aquí al final de la partida vas a hablar únicamente utilizando la vocal que decida el resto. Un trago por cada falta",
"De aquí a 5 rondas hablarás en tercera persona sobre ti mismo. Por ejemplo Julían en lugar de decir quiero agua debe decir Julian dice que quiere agua. Un trago por cada fallo"
];

let preguntas = ["¿Qué es lo último de lo que te arrepientes? Tienes la oportunidad de enmendarlo si es posible (Por atreverte reparte 4 tragos)", 
"Cuál es tú película favorita, un trago por cada uno que la haya visto",
"¿Cuál es tu videojuego favorito, si otro de los presentes lo ha jugado bebe 1 trago?", 
"Bebe si te gustaría que no estuviese alguien de los aquí presentes",
"Si supieras cuándo vas a morir, ¿cambiarías tu forma de vivir? Bebe 1",
"¿Qué es lo que más miedo te da? Bebe 2",
"¿Tienes algún miedo que no le hayas contado a nadie? Si es así bebe 2",
"Si pudieras pedir un deseo ahora mismo, ¿cuál sería? Bebe 2",
"¿Cuántas veces has comido verdura esta semana? Si es menos de 3 bebe 3 tragos",
"Si fueses un animal… ¿cuál serías? Reparte los tragos que acuerdes con el resto en función de lo alpha que sea ese animal",
"¿Quién te ha influenciado más en la vida? Bebe 2",
"¿Cuál es tu canción favorita? Responde y ponedla para que todo el mundo la disfrute",
"¿En qué momento de tu vida has pasado más vergüenza? Si hay pruebas muéstralas y además bebe 1", 
"Si solo pudieras escuchar a un cantante o grupo durante el resto de tu vida, ¿cuál sería? Si a alguno no le gusta que beba un trago", 
"Si no hubiera leyes durante un día... ¿qué 3 cosas harías con mayor prioridad? bebe 2, si te has pasado demasiado bebe 5 y vuelve al mundo real", 
"Si pudieras ser un famoso durante un día, ¿qué famoso serías? Bebe 1", 
"¿Con quién de los aquí presentes harías un trío? Brindad por ello",
"¿Quién de los aquí presentes dirías que es el más fuerte? Brinda con él con 2 traguitos",
"¿Dónde te irías con los aquí presentes a pasar unos días? Todos beben 2",
"¿Qué es lo que más te aburre? Bebe 1 para animarte",
"¿Cuál es la historia más vergonzosa en donde has vomitado? Reparte 2",
"¿Has llorado viendo alguna película, cuál? Nadie bebe en esta ronda.",
"Si solo pudieses llevar un conjunto de ropa puesto ¿Cuál sería?",
"¿Cuántas veces has ido a mear hoy? Bebe una vez por cada una",
"¿Cuál es tu serie de televisión preferida? Si alguien la ha visto que beba",
"¿Qué comida no probarías jamás? Bebe 2 si a alguno de los aquí presentes le encanta esa comida",
"Por 10.000€ ¿Chuparías el pene/vagina de la persona de tu derecha?. Si la respuesta es sí brinda con esa persona y empezad a plantearlo",
"¿Quién sería la última de las personas presentes que dejarías que cocinase para tí? Brindad por ello ambos",
"Si te abrieses Onlyfans ¿Qué precio pondrías teniendo en cuenta que subirías fotos desnudo/a? Si alguno de los presentes pagaría por verte que beba 1 trago"
];

let cultura = ["Número de habitantes en el lugar en el pueblo/ciudad en el que vives, si te acercas 1.000.000 arriba o abajo te libras de beber si no bebe 3",
"Cita los elementos de la primera columna empezando por la izquierda de la tabla periódica, si te lo sabes reparte 5, si no te lo sabes bebe 2",
"¿A qué elemento corresponde el símbolo K?, si lo sabes reparte 6",
"¿En qué año llegó Cristóbal Colón a América?, si fallas bebes 3",
"¿Qué significan las siglas FIFA?, si no lo sabes deberás beber 4 tragos",
"¿En que se especializa la cartografía?, bebe 2 tragos si fallas y 4 si te ha costado hasta entender la palabra",
"¿Cuál es el país más extenso del mundo?, si aciertas reparte 3 tragos",
"¿Cuál es el nombre del himno nacional Francés?, reparte 4 tragos si aciertas o bebe 1 si fallas",
"¿Qué es más pequeño, un átomo o una molécula?, 3 tragos en juego",
"¿A qué país pertenece la ciudad de Varsovia?, si aciertas no beberás 2",
"¿Cuál es el hogar de los dioses nórdicos? Si aciertas repartes 2. \nPISTA: Thor, Vengadores...",
"¿Cuál es el equipo con más champions? Reparte 2 tragos si aciertas",
"¿Cómo se llama el fundador de Zara? Si fallas bebes 1.",
"¿Cuál es la capital de Islandia? Reparte 5 si sabes la respuesta",
"¿De qué año a qué año transcurrió la Segunda Guerra Mundial?, si aciertas reparte 1, si fallas bébelo",
"¿Quién es el autor del cuadro La Última Cena?",
"¿Cuál es el océano más grande de La Tierra?, 2 tragos en juego",
"¿Cuántos colores tiene la bandera de Bulgaria? Si has acertado reparte 3",
"¿Cuántos colores tiene la bandera de Chile? Si has acertado reparte 3",
"¿Cuál es el río más largo del mundo? Si has fallado bebe 2",
"¿A qué compositor clásico pertenecen los nocturnos para piano? Si aciertas reparte 2",
"Ordena estos sucesos cronológicamente: Ataque a Pearl Harbor, Caída estrepitosa de Wall Street, Toma de Francia por parte de Htiler, Guerra de Vietnam. reparte 4 si aciertas.",
"¿Cuántos estados tiene integrados Estados Unidos? Si respondes bien reparte 4",
"¿Cuántos años duró la guerra de los 100 años? Si fallas bebes 1, si respondes bien reparte 3",
"¿Cuál fue la primera película que apareció de Disney? Si respondes bien reparte 3",
"¿Quién promulgó la frase Hoy Dios ha muerto? Reparte 2 si lo aciertas",
"Quién separó en dos las aguas en la biblia. Bebe 2 si fallas para rellenas tus mares.",
"¿Cuál es el edificio más alto del mundo? 2 tragos a repartir si aciertas",
"Cita una de las tres películas con más premios Óscar de la historia o bebe 2 tragos.\nPISTA: 11 Óscars",
"¿Cuál de estas no es una de las siete maravillas del mundo moderno? Coliseo Romano, Petra, Faro de Alejandría, Taj Mahal. Si fallas bebes 2.",
"¿Cuál es el planeta más grande del Sistema Solar? Si fallas bebe 2 tragos gigantes como planetas.",
"¿Cuál es el animal representado en la Vara de Asclepio/Esculapio. Símbolo de la medicina? 3 tragos que repartes si aciertas galeno.",
"¿Cuál es la película más taquillera de la historia? Reparte 4 si aciertas.",
"¿Cuántas notas musicales existen? Bebe 1 si has fallado.",
"Ordena estás películas de menos a más premios Óscar: Star Wars: Episodio IV. - La La Land - Mary Poppins - Ben Hur. Si aciertas repartirás 4 tragos",
"Ordena estás películas de menos a más premios Óscar: Braveheart. - Algunos Hombres Buenos - El silencio de los corderos - El Padrino: parte II. Si fallas bebe 1 y si aciertas reparte 4.",
"Estos personajes pertenecen a una de las siguientes categorías (Deporte, Medicina, Arte Clásico, Cine). Clasifícalos de manera correcta y reparte tantos tragos como aciertos hayas tenido: Louis Pasteur, Idris Elba, Sean Penn, Tiziano, Ciro Immobile.",
"Estos personajes pertenecen a una de las siguientes categorías (Deporte, Medicina, Arte Clásico, Cine). Clasifícalos de manera correcta y reparte tantos tragos como aciertos hayas tenido: Andrew Robertson, Hipócrates, James Stewart, Sigmund Freud, El Greco.",
"Cuál es el nombre del autor español de las obras La casa de Bernarda Alba y Bodas de Sangre que murió fusilado tras la Guerra Civil Española. reparte 3 si lo aciertas."
];

let beberxbeber = ["Reparte 5 tragos si eres el que  siempre lleva a la gente de tu grupo en coche", 
"Bebed tantos tragos como número de mes hayáis nacido cada uno",
"Repartid cada uno el segundo dígito de los minutos de la hora que sea actualmente",
"Gira una botella y al que apunte el tapón deberá beber un chupito",
"Todos beben 2 tragos",
"Prefieres Tobbey Mcguire, Andrew Garfield o Tom Holland, lector espera a las respuestas, si tu favorito es Tom 5 tragos, si es Tobbey 3 tragos si es Andrew 1 trago , lo reconocemos somos muy fans", 
"Un brindis por todos los que no están, os echamos de menos", 
"TODOS REPARTEN 2 TRAGOS",
"Silencio todo el mundo, comienza el juego de las bodas, todos podeis hacer una propuesta de matrimonio a otro jugador, este podrá aceptarla o no, si la rechaza deberás beber 2 tragos para ahogar las penas, si acepta debeis besaros (pico) y el resto beberá 5 tragos",
];

let picantes = ["Cuenta un sueño erótico que hayas tenido, reparte 2 tragos", 
"Dale un beso a otra persona del grupo, en la parte del cuerpo que prefieras, si se niega esa persona bebe 5",
"¿Qué es lo más raro con lo que te has masturbado? Puede ser un objeto, un vídeo, una escena en tu mente...",
"¿Que sentiste la primera que practicaste sexo oral?",
"¿Quién es la última persona en el mundo con la que tendrías sexo oral si no hubiese más remedio?",
"Colocaros de manera intercalada chico y chica (en la medida de lo posible) y pasaros un hielo con la boca."
];

//Funciones
const leerDB = () => {
    contadorRondas = 0; //Al inicio lo establezco en cero
    zonaNombre.innerHTML = '';
    zonaTexto.innerHTML = ''; //Siempre que trabajamos con innerHtml tenemos que empezar con el string vacio
    //Ahora vamos a leer lo que viene del local storage y lo voy a almacenar en mi array para poder ir eligiendo a cada turno los jugadores
    arrayJugadores = JSON.parse(localStorage.getItem('partida')); //lo parseo de nuevo ya que es un JSON cuando esta almacenado

    if(arrayJugadores === null){
        arrayJugadores = [];
        alert("la lista de jugadores esta vacia.")
    }//si solo hay un jugador lanzar alerta tambien y decir que es un borracho por querer jugar solo
    else{ //Existe algo en el local storage
        
        zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
        <h1>La partida está a punto de empezar, haz click en el texto o pulsa espacio cuando esté preparado</h1>
        </div>`

    }

}

const siguienteRonda = () => {
    
    console.log(contadorRondas);

    zonaNombre.innerHTML = '';
    zonaTexto.innerHTML = ''; //Siempre que trabajamos con innerHtml tenemos que empezar con el string vacio
    
    if(contadorRondas <= rondasPorPartida){
    
        //En las pruebas de tipo general no debe salir nombre, y en las de duelo deben salir dos nombres
        let randomTipo = Math.floor(Math.random()*tiposPruebas);
        //console.log("tipo de la prueba: "+randomTipo)

        if(randomTipo == 0){ //pruebas
            if(contadorPruebas <= 8){  
                contadorRondas++; //Sumo uno al contador de rondas
                contadorPruebas++;
                let objetoRonda = seleccionarJugador(1);
                let jugadorRonda = objetoRonda.jugador
                let personaje = objetoRonda.personaje

                let randomPrueba = Math.floor(Math.random()*pruebas.length);
                juegoRonda = pruebas[randomPrueba];

                document.body.style.backgroundColor = "#118ab2";
            
                /*Que me devuelva la imagen el metodo que me devuelve el jugador, en un objeto que tenga un atributo que sea el araay jugaodres y otro que sean las imagenes*/

                zonaNombre.innerHTML += `<div class="jugador-cara" style="background-image:url(../Images/${personaje});"></div>
                <div class="seccion-nombre" id="texto-nombre">
                <h1>${jugadorRonda}</h1>
                </div>`
            
                zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                <h1>${juegoRonda}</h1>
                </div>`
    
                pruebas.splice(randomPrueba, 1);//Para que en una misma partida no salga dos veces la misma prueba
            }
            else{
                siguienteRonda();
            }

            
        }

        if(randomTipo == 1){ //generales
            if(contadorGenerales <= 8){ 
                contadorRondas++; //Sumo uno al contador de rondas
                contadorGenerales++;
                let randomGeneral = Math.floor(Math.random()*generales.length);
                juegoRonda = generales[randomGeneral];

                document.body.style.backgroundColor = "#118ab2";
                
                zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                <h1>${juegoRonda}</h1>
                </div>`
    
                generales.splice(randomGeneral, 1);//Para que en una misma partida no salga dos veces la misma prueba
            }
            else{
                siguienteRonda();
            }

        }

        if(randomTipo == 2){ //eleccion
            if(contadorEleccion <= 2){ 
                contadorRondas++; //Sumo uno al contador de rondas
                contadorEleccion++;
                let randomTragos = Math.floor((Math.random()*3)+1); //Sumandole uno evito que salgan cero tragos
                let randomEleccion = Math.floor(Math.random()*eleccion.length);
                let randomConvencer = Math.random() < 0.25
                
                juegoRonda = eleccion[randomEleccion];

                document.body.style.backgroundColor = "#ffd166";
            
                if(randomConvencer === true){ //Una de cada 4 veces saldrá lo de convencer
                    zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                    <h1>${juegoRonda}, ${randomTragos} tragos. Una vez se haya votado la minoría podrá argumentar para
                    llevar a la mayoría a su terreno. En caso de conseguirlo la nueva minoría beberá lo que toque</h1>
                    </div>`

                }else{
                    zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                    <h1>${juegoRonda}, ${randomTragos} tragos</h1>
                    </div>`
                }

                eleccion.splice(randomEleccion, 1);//Para que en una misma partida no salga dos veces la misma prueba
            }
            else{
                siguienteRonda();
            }
            
        }

        if(randomTipo == 3){ //duelos
            if(contadorDuelos <= 5){ 
                contadorRondas++; //Sumo uno al contador de rondas
                contadorDuelos++;
                let objetoRonda = seleccionarJugador(2);
                let jugadorRonda = objetoRonda.jugador
                let personaje = objetoRonda.personaje
                let randomDuelo = Math.floor(Math.random()*duelos.length);
                juegoRonda = duelos[randomDuelo];

                document.body.style.backgroundColor = "#ef476f";

                zonaNombre.innerHTML += `<div class="caras-duelos">
                <div class="jugador-cara" style="background-image:url(../Images/${personaje[0]});"></div>
                <div class="jugador-cara" style="background-image:url(../Images/${personaje[1]});"></div>
                </div>
                <div class="seccion-nombre" id="texto-nombre">
                <h1>${jugadorRonda[0]} y ${jugadorRonda[1]}</h1>
                </div>`
    
                zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                <h1>${juegoRonda}</h1>
                </div>`
    
                duelos.splice(randomDuelo, 1);//Para que en una misma partida no salga dos veces la misma prueba
            }
            else{
                siguienteRonda();
            }
            
        }

        if(randomTipo == 4){ //castigos
            if(contadorCastigos <= 4){ 
                contadorRondas++; //Sumo uno al contador de rondas
                contadorCastigos++;
                let objetoRonda = seleccionarJugador(1);
                let jugadorRonda = objetoRonda.jugador
                let personaje = objetoRonda.personaje
                let randomCastigo = Math.floor(Math.random()*castigos.length);
                juegoRonda = castigos[randomCastigo];

                document.body.style.backgroundColor = "#222222";
            
                zonaNombre.innerHTML += `<div class="jugador-cara" style="background-image:url(../Images/${personaje});"></div>
                <div class="seccion-nombre" id="texto-nombre">
                <h1>${jugadorRonda}</h1>
                </div>`
            
                zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                <h1>${juegoRonda}</h1>
                </div>`
    
                castigos.splice(randomCastigo, 1);//Para que en una misma partida no salga dos veces la misma prueba
            }
            else{
                siguienteRonda();
            }
            
        }

        if(randomTipo == 5){ //preguntas
            if(contadorPreguntas <= 3){ 
                contadorRondas++; //Sumo uno al contador de rondas
                contadorPreguntas++;
                let objetoRonda = seleccionarJugador(1);
                let jugadorRonda = objetoRonda.jugador
                let personaje = objetoRonda.personaje
                let randomPregunta = Math.floor(Math.random()*preguntas.length);
                juegoRonda = preguntas[randomPregunta];

                document.body.style.backgroundColor = "#118ab2";
            
                zonaNombre.innerHTML += `<div class="jugador-cara" style="background-image:url(../Images/${personaje});"></div>
                <div class="seccion-nombre" id="texto-nombre">
                <h1>${jugadorRonda}</h1>
                </div>`
    
                zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                <h1>${juegoRonda}</h1>
                </div>`
    
                preguntas.splice(randomPregunta, 1);//Para que en una misma partida no salga dos veces la misma prueba
            }
            else{
                siguienteRonda();
            }

        }

        if(randomTipo == 6){//cultura
            if(contadorCultura <= 2){ 
                contadorRondas++; //Sumo uno al contador de rondas
                contadorCultura++;
                let objetoRonda = seleccionarJugador(1);
                let jugadorRonda = objetoRonda.jugador
                let personaje = objetoRonda.personaje
                let randomCultura = Math.floor(Math.random()*cultura.length);
                juegoRonda = cultura[randomCultura];

                document.body.style.backgroundColor = "#0068c9";
            
                zonaNombre.innerHTML += `<div class="jugador-cara" style="background-image:url(../Images/${personaje});"></div>
                <div class="seccion-nombre" id="texto-nombre">
                <h1>${jugadorRonda}</h1>
                </div>` 
            
                zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                <h1>${juegoRonda}</h1>
                </div>`
    
                cultura.splice(randomCultura, 1);//Para que en una misma partida no salga dos veces la misma prueba
            }
            else{
                siguienteRonda();
            }

            
        }

        if(randomTipo == 7){ //beberxbeber
            if(contadorBeberxbeber <= 3){ 
                contadorRondas++; //Sumo uno al contador de rondas
                contadorBeberxbeber++;
                let randomBeber = Math.floor(Math.random()*beberxbeber.length);
                juegoRonda = beberxbeber[randomBeber];

                document.body.style.backgroundColor = "#06d6a0";
            
                zonaTexto.innerHTML += `<div class="seccion-texto" id="texto-juego">
                <h1>${juegoRonda}</h1>
                </div>`
    
                beberxbeber.splice(randomBeber, 1);//Para que en una misma partida no salga dos veces la misma prueba
            }
            else{
                siguienteRonda();
            }
            
        }
       
    }else{

        contadorRondas = 0;//Reinicio el contador de rondas
        window.location.href = "Setup.html";

    }
    
}

const seleccionarJugador = (numeroJugadores) => {//Esta funcion selecciona tantos jugadores como se le indique por parametro, se ejecuta arriba en donde se inserta en la zona por eso los prints a veces muestran que el array tiene elementos que quizas no deberian verse
    let jugadoresRonda = [];
    let imagenesRonda = []
    for (let i = 0; jugadoresRonda.length < numeroJugadores; i++) {
        randomJugador = Math.floor(Math.random()*arrayJugadores.length);
        
        if(jugadoresRonda.includes(arrayJugadores[randomJugador].nombre) === false){   
            imagenesRonda.push(arrayJugadores[randomJugador].personaje)
            jugadoresRonda.push(arrayJugadores[randomJugador].nombre);
        }

    }
    
    return {
        jugador: jugadoresRonda, 
        personaje: imagenesRonda
    }
}

//Event Listener
document.addEventListener('DOMContentLoaded', leerDB) //Este evento se genera cuando el DOM esta cargado

cuerpoApp.addEventListener('click', siguienteRonda);

document.body.onkeyup = function(e){
    if(e.keyCode == 32){ //Espacio
        siguienteRonda();
    }
}

/*
FIXME:
Comprobar que salen preguntas de todos los tipos que antes no tenia bien programado eso y en los diferentes ifs accedia a arrays de otro tipo


TODO:

Mirar bien que sustituye a path en firefox o Opera (aqui parece que funciona con path sin cambiar nada) y tal para que funcione lo de sumar copas y eliminar jugadores, lo tengo en un marcador del portatil

importante incluir los contradores de las rondas que ha salido cada tipo de prueba y
asi limitar la aparicion de los distintos tipos de pruebas que tenemos -> IMPORTANTE
Para esto es interesante que se sumen las rondas dentro de los if de cada prueba y que tengan otra condicion
que sea que el numero de rondas que ha salido ese juego es menor que el contador

decidir si los castigos se acaban con una pantalla (mas esfuerzo programando pero queda mejor, no se mentiene entre partidas) o se especifica las rondas
en el texto (peor esteticamente pero se mantiene entre partidas)

una forma que se me ocurre de saber los virus/castigos que se tienen activos es teniendo un array de objetos de
ese tipo que tenga un atributo nombre del jugador, otro titulo del virus y otro rondas activo, empieza en un random y disminuira
en cada comprobacion que sera cada ronda, cuando llegue a cero se pone un mensaje de que se ha pasado el virus de lo que sea

Seccion sobre nosotros en el menu y algo en lo que se indique que el juego no incita a beber ni nada

Manera de controlar que no se venga de la nada a la pantalla del juego, si no que tienes que pasar por la de setup

pop-up o ventana modal (no se puede interactuar con lo de detras hasta que se cierre con las instrucciones bien explicadas cuando se clique en la interrogacion)

A lo mejor para el modo caliente es bueno idea tener varios arrays, rollo calientes generales, calientes retos...

/ ------------------------------------------------------------------------------------------------------------------------------------------------------ /

HECHO:

Hacer que cada vez que sale una prueba no pueda salir, puedo hacer un splice -> HECHO

seleccionar un jugador podria ser un metodo propio con un return -> HECHO

en las de elegir entre dos un numero random entre 1 y tres para determinar los tragos que se van a beber -> HECHO

Boton que lleve a la pantalla del juego desde la de setup -> HECHO
*/