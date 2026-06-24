const db = require('./config/db');
const sqlite3 = require('sqlite3');
const path = require('path');
require('dotenv').config();

const modulesData = [
  {
    name: "Introduction to the Language",
    description: "Learn the Spanish alphabet, vowels, pronunciation rules, pronunciation guide, and basic language foundations to build strong speaking and reading skills.",
    category: "Basics",
    duration: "~20 Mins",
    icon: "bi-info-circle",
    subtopics: [
      "Los alfabetos",
      "Los vocales",
      "Rules of pronunciation",
      "Special pronunciations of C and G",
      "Pronunciation guide",
      "El Abecedario"
    ],
    note: {
      title: "Spanish Basics & Pronunciation Guide",
      content: `Spanish (Español) is one of the most widely spoken languages in the world. It is the official language of Spain and most countries in Latin America. Learning Spanish allows you to communicate with millions of people and understand a rich cultural heritage.

Before learning words and sentences, it is important to understand how Spanish sounds, how its alphabet works, and how words are pronounced. This module combines the topics:
- Los alfabetos
- Los vocales
- Rules of pronunciation
- Special pronunciations of C and G
- Pronunciation guide
- El Abecedario

### The Spanish Alphabet (El Abecedario)
Spanish uses the same 26 letters as English.

| Letter | Pronunciation |
|---|---|
| A | ah |
| B | beh |
| C | seh |
| D | deh |
| E | eh |
| F | efe |
| G | heh |
| H | ache |
| I | ee |
| J | hota |
| K | ka |
| L | ele |
| M | eme |
| N | ene |
| O | oh |
| P | pe |
| Q | ku |
| R | ere |
| S | ese |
| T | te |
| U | oo |
| V | uve |
| W | doble uve |
| X | equis |
| Y | ye |
| Z | seta |

### Spanish Vowels
Spanish has five vowels:

| Vowel | Pronunciation |
|---|---|
| A | ah |
| E | eh |
| I | ee |
| O | oh |
| U | oo |

**Important Rule:**
Spanish vowels are pronounced consistently. Unlike English, vowel sounds rarely change.

*Examples:*
- Casa = kah-sah
- Mesa = meh-sah
- Libro = lee-broh

### Pronunciation Rules
#### Letter H
The letter H is always silent.
- *Hola* = ola
- *Hotel* = otel

#### Letter J
Produces a strong "h" sound.
- *Juan*
- *José*
- *Jugar*

#### Letter Ñ
Produces a "ny" sound.
- *Niño* = child
- *España* = Spain

### Special Pronunciation of C
#### Before A, O, U
C sounds like K.
- *Casa*
- *Cosa*
- *Cultura*

#### Before E, I
C sounds like S.
- *Cena*
- *Cine*

### Special Pronunciation of G
#### Before A, O, U
G sounds like the English G.
- *Gato*
- *Goma*

#### Before E, I
G sounds like H.
- *Gente*
- *Girar*

### Basic Reading Practice
| Spanish | Pronunciation |
|---|---|
| Hola | oh-la |
| Casa | ka-sa |
| Gato | ga-to |
| Niño | nee-nyo |
| Mesa | me-sa |

### Why Learning Pronunciation Matters
Good pronunciation helps you:
- Speak confidently
- Understand native speakers
- Improve listening skills
- Avoid common mistakes

### Quick Summary
- ✓ Spanish has 26 letters.
- ✓ There are only 5 vowels.
- ✓ H is silent.
- ✓ Ñ sounds like "ny".
- ✓ C and G change pronunciation depending on the following vowel.
- ✓ Spanish pronunciation is generally consistent.`
    },
    quiz: {
      title: "Introduction to Spanish Quiz",
      questions: [
        {
          text: "Which letter is unique to the Spanish alphabet compared to English?",
          a: "Ç", b: "Ñ", c: "X", d: "Z",
          correct: "B"
        },
        {
          text: "How is the letter 'C' pronounced in the word 'coche'?",
          a: "Like 'S'", b: "Like 'CH'", c: "Like 'K'", d: "It is silent",
          correct: "C"
        },
        {
          text: "What is the correct Spanish pronunciation sound for the vowel 'I'?",
          a: "Like English 'eye'", b: "Like English 'ee' in see", c: "Like English 'ih' in bit", d: "Like English 'uh'",
          correct: "B"
        }
      ]
    }
  },
  {
    name: "Numbers",
    description: "Master Spanish cardinal and ordinal numbers, counting systems, and number usage in real-life conversations.",
    category: "Basics",
    duration: "~20 Mins",
    icon: "bi-hash",
    subtopics: [
      "Cardinal Numbers (1–100)",
      "Cardinal Numbers (1–1000)",
      "Ordinal Numbers"
    ],
    note: {
      title: "Spanish Numbers & Counting Systems",
      content: `### Overview
Numbers are used every day when talking about age, dates, prices, time, phone numbers, and quantities.

This module combines:
- Cardinal Numbers (1–100)
- Cardinal Numbers (1–1000)
- Ordinal Numbers

### Numbers 1–20
| Spanish | English |
|---|---|
| Uno | One |
| Dos | Two |
| Tres | Three |
| Cuatro | Four |
| Cinco | Five |
| Seis | Six |
| Siete | Seven |
| Ocho | Eight |
| Nueve | Nine |
| Diez | Ten |
| Once | Eleven |
| Doce | Twelve |
| Trece | Thirteen |
| Catorce | Fourteen |
| Quince | Fifteen |
| Dieciséis | Sixteen |
| Diecisiete | Seventeen |
| Dieciocho | Eighteen |
| Diecinueve | Nineteen |
| Veinte | Twenty |

### Tens
| Spanish | English |
|---|---|
| Treinta | 30 |
| Cuarenta | 40 |
| Cincuenta | 50 |
| Sesenta | 60 |
| Setenta | 70 |
| Ochenta | 80 |
| Noventa | 90 |
| Cien | 100 |

### Forming Larger Numbers
- **31** = *Treinta y uno*
- **45** = *Cuarenta y cinco*
- **62** = *Sesenta y dos*
- **78** = *Setenta y ocho*

*Note: The word **y** means "and".*

### Hundreds
| Spanish | English |
|---|---|
| Cien | 100 |
| Doscientos | 200 |
| Trescientos | 300 |
| Cuatrocientos | 400 |
| Quinientos | 500 |
| Seiscientos | 600 |
| Setecientos | 700 |
| Ochocientos | 800 |
| Novecientos | 900 |

### Ordinal Numbers
Ordinal numbers indicate position or order.

| Spanish | English |
|---|---|
| Primero | First |
| Segundo | Second |
| Tercero | Third |
| Cuarto | Fourth |
| Quinto | Fifth |
| Sexto | Sixth |
| Séptimo | Seventh |
| Octavo | Eighth |
| Noveno | Ninth |
| Décimo | Tenth |

### Examples
- *Soy el primero.*
- *Ella es la segunda.*
- *Tengo veinte años.*
- *Hay treinta estudiantes.*

### Quick Summary
- ✓ Cardinal numbers show quantity.
- ✓ Ordinal numbers show position.
- ✓ Use "y" between tens and units.
- ✓ Numbers are essential for dates, age, time, and prices.`
    },
    quiz: {
      title: "Spanish Numbers Evaluation",
      questions: [
        {
          text: "What is the Spanish word for the number fifteen (15)?",
          a: "diez y cinco", b: "quince", c: "once", d: "veinte",
          correct: "B"
        },
        {
          text: "How do you write 'thirty-two' in Spanish?",
          a: "treintaydós", b: "treinta y dos", c: "veintidós", d: "treinta dos",
          correct: "B"
        },
        {
          text: "What is the ordinal number for 'third' in its masculine singular form?",
          a: "tres", b: "tercero", c: "triple", d: "primero",
          correct: "B"
        }
      ]
    }
  },
  {
    name: "Los artículos",
    description: "Understand definite and indefinite articles, gender rules, and article agreement in Spanish grammar.",
    category: "Grammar",
    duration: "~20 Mins",
    icon: "bi-body-text",
    subtopics: [
      "Definite Articles (The)",
      "Indefinite Articles (A, An, Some)",
      "Gender Rules",
      "Exceptions",
      "Special Rule"
    ],
    note: {
      title: "Definite and Indefinite Articles in Spanish",
      content: `Articles always accompany a noun with which they agree on gender and number. In Spanish, there are two types of articles: Indefinite articles and definite articles. Here we will find a clear and complete explanation about definite articles of Spanish and how to apply them correctly.

For example:
- **María es la hermana de Carlos.** (Maria is the sister of Carlos.)
- **El helado está rico.** (The ice cream is rich.)
- **Newton es el padre de la física.** (Newton is the father of the physics.)

### Definite & Indefinite Articles Table
| Gender | Singular Definite | Singular Indefinite | Plural Definite | Plural Indefinite |
|---|---|---|---|---|
| **Masculine** | **El** (e.g. *El teléfono*) | **Un** (e.g. *Un teléfono*) | **Los** (e.g. *Los teléfonos*) | **Unos** (e.g. *Unos teléfonos*) |
| **Feminine** | **La** (e.g. *La universidad*) | **Una** (e.g. *Una universidad*) | **Las** (e.g. *Las universidades*) | **Unas** (e.g. *Unas universidades*) |

### Exception (Avoiding Cacophony)
In order to evict the cacophony of words, a singular feminine noun that ends with vowel a | ha sound (specifically, a stressed "a" or "ha" sound) must be accompanied by the masculine article such as **El** or **Un** respectively. This rule is applicable only to the singular form of the feminine noun.

For example:
- **El** ala (wing) / **Un** ala
- **El** hacha (axe) / **Un** hacha

Plural Feminine:
- **Las** alas / **Unas** alas
- **Las** hachas / **Unas** hachas

### Tips: Noun Endings & Gender
In Spanish, the genders of nouns are de facto based on the last termination of specific vowels or syllables. For example, words that end with **-o** often become masculine, whereas words that end with **-a** become feminine. 

Similarly, words ending with the syllable **-ma** become masculine, and words ending with syllables such as **-umbre, -tud, -dad, -tad, -sión, -ción** become feminine.

For example:
- **El rebaño** (Flock) | **La muchedumbre** (Crowd)
- **El tema** (Theme) | **La multitud** (Multitude)
- **El problema** (Problem) | **La edad** (Age)
- **El libro** (Book) | **La libertad** (Liberty)
- **El regalo** (Gift) | **La presión** (Pressure)
- **El cuerpo** (Body) | **La habitación** (Room)
- **El rostro** (Face) | **La cara** (Face)
- **El reino** (Kingdom) | **La reina** (Queen)
- **El manzano** (Apple tree) | **La manzana** (Apple)

However, there are few exceptions to the above rules:
- **El mapa**
- **El artista**
- **El colega**
- **La mano**
etc.

### Conversational Examples:
- **Los domingos yo no trabajo** (Sundays I don't work)
- **Toco el violín** (I play the violin)
- **Juego a las cartas** (I play cards / whist)
- **María es una amiga de Laura** (Maria is a friend of Laura)
- **Este niño es un ángel** (This child is an angel)
- **Su hermano es un travieso** (His brother is a naughty boy)`
    },
    quiz: {
      title: "Articles & Gender Agreement Quiz",
      questions: [
        {
          text: "Which of the following definite articles matches 'libros' (masculine plural)?",
          a: "el", b: "la", c: "los", d: "las",
          correct: "C"
        },
        {
          text: "What is the correct indefinite article for the word 'casa'?",
          a: "un", b: "una", c: "unos", d: "unas",
          correct: "B"
        },
        {
          text: "Which word is a common gender exception that uses 'el' despite ending in '-a'?",
          a: "mesa", b: "puerta", c: "mapa", d: "silla",
          correct: "C"
        }
      ]
    }
  },
  {
    name: "Las cosas de la clase",
    description: "Learn vocabulary related to classroom objects and everyday educational environments.",
    category: "Vocabulary",
    duration: "~20 Mins",
    icon: "bi-backpack",
    subtopics: [
      "Masculine Words",
      "Feminine Words",
      "Useful Classroom Sentences",
      "Practice Vocabulary"
    ],
    note: {
      title: "Classroom Objects Vocabulary",
      content: `### Overview
Classroom vocabulary helps students communicate during lessons and understand educational environments.

### Las palabras con artículos masculinos (Masculine Words)
| Spanish | English |
|---|---|
| **El libro** | Book |
| **El bolígrafo** | Pen |
| **El sacapunta** | Sharpener |
| **El escritorio** | Desk |
| **El cuaderno** | Notebook |
| **El pegamento** | Glue |
| **El mapa** | Map |
| **El techo** | Ceiling |
| **El suelo / El piso** | Floor |
| **El ordenador** | Computer |
| **El lápiz** | Pencil |
| **El papel** | Paper |
| **El ventilador** | Fan |
| **El pupitre** | Desk |
| **El marcador** | Marker |
| **El borrador** | Eraser |
| **El reloj** | Clock |
| **El cuadro** | Wall painting |
| **El proyector** | Projector |
| **Los auriculares** | Headset |

### Las palabras con artículos femeninos (Feminine Words)
| Spanish | English |
|---|---|
| **La papelera** | Dust bin |
| **La puerta** | Door |
| **La salida** | Exit |
| **La mesa** | Table |
| **La regla** | Ruler |
| **La pizarra** (or *La pizzara*) | Blackboard |
| **La grapadora** | Stapler |
| **La pantalla** | Screen |
| **La libreta** | Pocket book |
| **La basura** | Trash bin |
| **La entrada** | Entrance |
| **La luz** | Light |
| **La silla** | Chair |
| **La escala** | Scale |
| **La tiza** | Chalk |
| **La pared** | Wall |
| **La ventana** | Window |
| **Las tijeras** | Scissors |

---

### Useful Classroom Sentences
- *El libro está sobre la mesa.* (The book is on the table.)
- *La profesora escribe en la pizarra.* (The teacher writes on the blackboard.)
- *Tengo un lápiz y un cuaderno.* (I have a pencil and a notebook.)

### Practice Vocabulary
#### Objects You Use Daily
- Libro
- Cuaderno
- Bolígrafo
- Lápiz
- Borrador

*Try memorizing five words each day.*

### Quick Summary
- ✓ Learn vocabulary with articles.
- ✓ Remember noun gender.
- ✓ Use classroom words in simple sentences.`
    },
    quiz: {
      title: "Classroom Objects Quiz",
      questions: [
        {
          text: "What does 'el lápiz' mean?",
          a: "The notebook", b: "The pen", c: "The pencil", d: "The paper",
          correct: "C"
        },
        {
          text: "How do you say 'table' in Spanish?",
          a: "la mochila", b: "la mesa", c: "el libro", d: "la pizarra",
          correct: "B"
        },
        {
          text: "Translate 'the notebook' to Spanish:",
          a: "el libro", b: "el cuaderno", c: "el bolígrafo", d: "la silla",
          correct: "B"
        }
      ]
    }
  },
  {
    name: "Los datos personales",
    description: "Practice introducing yourself and sharing personal information in Spanish.",
    category: "Conversation",
    duration: "~20 Mins",
    icon: "bi-person-badge",
    subtopics: [
      "Basic Vocabulary",
      "Introducing Yourself",
      "Sample Introduction",
      "Mini Dialogue"
    ],
    note: {
      title: "Sharing Personal Information",
      content: `### Overview
When meeting someone for the first time, you need to know how to share personal information. This module teaches you how to introduce yourself and understand personal details.

### Basic Vocabulary (Los datos personales)
| Spanish Term | Literal Translation / Note | English Translation |
|---|---|---|
| **Los datos personales** | *[The datas personals]* | Personal details |
| **El nombre** | — | Name |
| **Los apellido(s)** | — | Surname(s) |
| **La edad** | — | Age |
| **La fecha de nacimiento** | — | Date of birth |
| **El sexo** | — | Sex / Gender |
| **Nombre del* padre** | *[Name of the father]* | Father’s name |
| **Nombre de la madre** | *[Name of the mother]* | Mother’s name |
| **La nacionalidad** | — | Nationality |
| **La dirección** | — | Address |
| **El estado** | — | State |
| **El código de la zona** | *[The code of the zone]* | Pin code / Zip code |
| **El país** | — | Country |

*Note: **del** is a contraction of **de** + **el** (of the).*

---

### Introducing Yourself
#### Asking a Name
- *¿Cómo te llamas?* (What is your name?)
- *Response:* **Me llamo Carlos.** (My name is Carlos.)

#### Asking Age
- *¿Cuántos años tienes?* (How old are you?)
- *Response:* **Tengo veinte años.** (I am twenty years old.)

#### Asking Nationality
- *¿Cuál es tu nacionalidad?*
- *Response:* **Soy indio.** (I am Indian.)

---

### Sample Introduction
*Hola. Me llamo Ravi. Tengo veinte años. Soy indio. Vivo en Chennai. Soy estudiante. Mucho gusto.*

---

### Mini Dialogue
**A:** *¿Cómo te llamas?*
**B:** *Me llamo María.*
**A:** *¿Cuántos años tienes?*
**B:** *Tengo diecinueve años.*
**A:** *¿De dónde eres?*
**B:** *Soy de España.*

---

### Quick Summary
- ✓ Learn how to say your name.
- ✓ Learn how to tell your age.
- ✓ Learn how to state your nationality.
- ✓ Practice introducing yourself in Spanish.`
    },
    quiz: {
      title: "Personal Details Assessment",
      questions: [
        {
          text: "How do you politely ask someone 'What is your name?' in Spanish?",
          a: "¿Cuántos años tienes?", b: "¿Cómo te llamas?", c: "¿Dónde vives?", d: "¿De dónde eres?",
          correct: "B"
        },
        {
          text: "Which verb is used to express age in Spanish?",
          a: "ser", b: "estar", c: "tener", d: "vivir",
          correct: "C"
        },
        {
          text: "What is the translation of 'Vivo en Madrid'?",
          a: "I live in Madrid.", b: "I am traveling to Madrid.", c: "Madrid is beautiful.", d: "My family is in Madrid.",
          correct: "A"
        }
      ]
    }
  },
  {
    name: "El origen y la nacionalidad",
    description: "Learn countries, nationalities, and how to express origin and identity in Spanish.",
    category: "Conversation",
    duration: "~20 Mins",
    icon: "bi-globe",
    subtopics: [
      "Introduction to Gentilicios",
      "Hispanoamérica Nationalities",
      "World Nationalities",
      "Special Nationality Forms"
    ],
    note: {
      title: "Origin, Identity, and Nationalities",
      content: `### Introduction to Gentilicios
In Spanish, **la nacionalidad** (nationality) or **el gentilicio** (demonym) is an adjective that expresses the relationship with a geographical place: a country, a region, or a city.

Unlike in English, nationalities in Spanish are **not capitalized** (unless they start a sentence) and must agree in gender and number with the noun they modify.

---

### Hispanoamérica Nationalities
Here are the gentilicios for Spanish-speaking countries in Latin America and Spain:

| Country (País) | Demonym (Gentilicio) | English Translation |
|---|---|---|
| **Argentina** | argentino/na | Argentine |
| **Bolivia** | boliviano/na | Bolivian |
| **Chile** | chileno/na | Chilean |
| **Colombia** | colombiano/na | Colombian |
| **Costa Rica** | costarricense | Costa Rican (Gender-neutral) |
| **Cuba** | cubano/na | Cuban |
| **Ecuador** | ecuatoriano/na | Ecuadorian |
| **España** | español/la | Spanish |
| **El Salvador** | salvadoreño/ña | Salvadoran |
| **Guatemala** | guatemalteco/ca | Guatemalan |
| **Guinea Ecuatorial** | guineano/na | Equatoguinean |
| **Honduras** | hondureño/ña | Honduran |
| **México** (Mexico) | mejicano/na | Mexican |
| **Nicaragua** | nicaragüense | Nicaraguan (Gender-neutral) |
| **Panamá** | panameño/ña | Panamanian |
| **Paraguay** | paraguayo/ya | Paraguayan |
| **Perú** | peruano/na | Peruvian |
| **Puerto Rico** | puertorriqueño/ña | Puerto Rican |
| **República Dominicana** | dominicano/na | Dominican |
| **Uruguay** | uruguayo/ya | Uruguayan |
| **Venezuela** | venezolano/na | Venezuelan |

---

### World Nationalities
Here are gentilicios for other major countries and regions around the world:

| Country / Region (País / Región) | Demonym (Gentilicio) | English Translation | Note / Standard Form |
|---|---|---|---|
| **Alemania** | alemano/na | German | *Standard form: alemán/ana* |
| **África** (Africa) | africano/na | African | — |
| **Asia** | asiático/ca | Asian | — |
| **Australia** | australiano/na | Australian | — |
| **Austria** | austriaco/ca | Austrian | — |
| **Brasil** | brasileño/ña | Brazilian | — |
| **Canadá** | canadienese (Canadiense) | Canadian | Gender-neutral |
| **China** | chino/na | Chinese | — |
| **Egipto** | egipcio/cia | Egyptian | — |
| **Escocia** | escocés/sa | Scottish | — |
| **Estados Unidos** | estadounidense (Estadounidense) | American / from the US | Gender-neutral |
| **Europa** | europeo/pea | European | — |
| **Francia** | francés/sa | French | — |
| **Gran Bretaña** | británico/ca | British | — |
| **Italia** | italiano/na | Italian | — |
| **Japón** | japonés/sa | Japanese | — |
| **Nueva Zelanda** | neozelandés/sa (Neo zelandés/sa) | New Zealander | — |
| **Países Bajos** | holandés/sa | Dutch | — |
| **Polonia** | polaco/ca (ploaco/ca) | Polish | *Image typo: ploaco/ca* |
| **Portugal** | portugués/sa | Portuguese | — |
| **Rusia** | ruso/sa | Russian | — |

---

### Special Nationality Forms
These countries have specific gentilicio forms or unique gender rules:

| Country (País) | Demonym (Gentilicio/Nacionalidad) | English Translation |
|---|---|---|
| **Bulgaria** | búlgaro / búlgara | Bulgarian |
| **Grecia** | griego / griega | Greek |
| **Sudáfrica** | sudafricano / sudafricana | South African |
| **Iraq** | iraquí | Iraqi (Gender-neutral) |
| **Uzbekistán** (Uzbekistan) | uzbeko (Uzbeko) | Uzbek |
| **Congo** | congoleño / congoleña | Congolese |
| **Arabia Saudí** | saudí | Saudi (Gender-neutral) |
| **Dinamarca** | danés / danesa | Danish |
| **Indonesia** | indonesio (indonesia) | Indonesian |`
    },
    quiz: {
      title: "Origin & Nationalities Evaluation",
      questions: [
        {
          text: "How do you translate 'Where are you from?'",
          a: "¿Cómo estás?", b: "¿De dónde eres?", c: "¿Qué hora es?", d: "¿Dónde vives?",
          correct: "B"
        },
        {
          text: "Which combination is grammatically correct for a feminine speaker?",
          a: "Soy de francés", b: "Soy francesa", c: "Soy francés", d: "Soy de mexicana",
          correct: "B"
        },
        {
          text: "What does 'Soy de España' mean?",
          a: "I speak Spanish.", b: "I want to visit Spain.", c: "I am from Spain.", d: "I live in Spain.",
          correct: "C"
        }
      ]
    }
  },
  {
    name: "Saludar y despedirse",
    description: "Master greetings, introductions, polite expressions, and farewell conversations.",
    category: "Conversation",
    duration: "~20 Mins",
    icon: "bi-chat-dots",
    subtopics: [
      "Greetings (Saludos)",
      "Polite Cues & Social Cues",
      "Farewells (Despedidas)"
    ],
    note: {
      title: "Greetings, Farewells & Social Etiquette",
      content: `### Greetings (Saludos)
In Spanish, greetings vary based on the time of day and the level of formality.

| Spanish Term | English Translation | Note / Level of Formality |
|---|---|---|
| **¡Hola!** | Hello / Hai | General greeting |
| **Buenos días** | Good morning | Used until noon |
| **Buenas tardes** | Good afternoon | Used from noon until dark |
| **Buenas tardes** | Good evening | Often used interchangeably for late afternoon/early evening |
| **Buenas noches** | Good night / Good evening | Used after dark |
| **Bienvenido/da** | Welcome | Matches the gender/number of the person welcomed |
| **¿Qué tal?** | What's up? | Informal |
| **¿Qué pasa?** | What's up? | Informal (Note: *image label notes this as formal*) |
| **Nada, todo bien** | Nothing, all good | Response to ¿Qué tal? or ¿Qué pasa? |
| **¿Cómo estás?** | How are you? | Informal |
| **¿Cómo está?** | How are you? | Formal |
| **Estoy bien** | I am fine; I am good | Standard response |

---

### Polite Cues & Social Cues
These expressions are key to polite interactions, introductions, and talking about name and profession:

| Spanish Term | English Translation | Note / Level of Formality |
|---|---|---|
| **Discúlpeme** | Excuse me | Polite/formal way to get attention |
| **Perdón** | Pardon | General apology / getting attention |
| **Señorito/ta** | Master / Miss | Title of respect |
| **Señor/ra** | Mister / Missus (Sir / Madam) | Title of respect |
| **¿A qué te dedicas?** | What do you do? | Informal inquiry about profession |
| **¿A qué se dedica?** | What do you do? | Formal inquiry about profession |
| **Soy ______** | I am ______ | Used to state profession or identity |
| **¿Cómo te llamas?** | What is your name? | Informal |
| **¿Cómo se llama?** | What is your name? | Formal |
| **Me llamo ______** | I am ______ (My name is) | Literally "I call myself" |
| **Mucho gusto** | Nice to meet you | General greeting upon meeting |
| **Encantado/a** | Nice to meet you | Literally "Delighted" (agrees with speaker's gender) |
| **Es un placer** | It's pleasure | Polite response |
| **Lo siento** | Sorry | In general |
| **Lo lamento** | Sorry | Expressing deep regret |
| **Por favor** | Please | — |
| **Gracias** | Thanks | — |
| **Muchas gracias** | Thank you so much | — |
| **Muchísimas gracias** | Thank you very much | — |
| **De nada** | Don't mention it | Reply to thanks |

---

### Farewells (Despedidas)
Use these expressions when leaving a conversation:

| Spanish Term | English Translation | Note / Level of Formality |
|---|---|---|
| **Hasta la vista** | See you | — |
| **Hasta pronto** | See you soon | — |
| **Hasta luego** | See you later | — |
| **Adiós / Chao** | Bye | *Chao* is more informal |
| **¡Cuídate!** | Take care | Informal command |
| **¡Cuídese!** | Take care | Formal command |`
    },
    quiz: {
      title: "Greetings & Farewells Quiz",
      questions: [
        {
          text: "What greeting is appropriate at 3:00 PM?",
          a: "Buenos días", b: "Buenas tardes", c: "Buenas noches", d: "Hasta luego",
          correct: "B"
        },
        {
          text: "How do you say 'See you tomorrow' in Spanish?",
          a: "Hasta luego", b: "Adiós", c: "Hasta mañana", d: "Hola",
          correct: "C"
        },
        {
          text: "What is the meaning of '¿Cómo estás?'?",
          a: "What is your name?", b: "Where are you from?", c: "How are you?", d: "What time is it?",
          correct: "C"
        }
      ]
    }
  },
  {
    name: "El verbo SER en presente de indicativo",
    description: "Learn the present tense conjugation and practical usage of the verb SER.",
    category: "Grammar",
    duration: "~20 Mins",
    icon: "bi-activity",
    subtopics: [
      "Present Conjugation",
      "Permanent Characteristics",
      "Origin & Descriptions"
    ],
    note: {
      title: "The Verb SER (To Be)",
      content: `### Introduction to the Indicative Mood
The **indicative mood** (el modo indicativo) is used to talk about real actions, events, states, and facts. It is one of the three primary grammatical moods in Spanish (along with the subjunctive and the imperative). We use the indicative to express facts in the present, past, future, and conditional tenses. In this module, we focus on the **present indicative** of the verb **SER** (to be).

---

### Present Conjugation of SER
In Spanish, there are two translations for the English verb *to be*: **SER** and **ESTAR**. **SER** is primarily used to describe permanent or inherent qualities, identity, origin, time, and characteristics.

Below is the conjugation of **SER** in the present indicative:

| Subject Pronoun | Verb Form | English Translation |
|---|---|---|
| **Yo** | soy | I am |
| **Tú** | eres | You are *(Informal)* |
| **Él / Ella / Usted** | es | He / She / You *(Formal)* |
| **Nosotros / Nosotras** | somos | We are |
| **Vosotros / Vosotras** | sois | You all are *(Informal - Spain)* |
| **Ellos / Ellas / Ustedes** | son | They / You all are *(Formal/Latin America)* |

---

### Key Uses of SER & Sentence Examples
**SER** is used in various contexts such as descriptions, origins, dates, time, and relationships.

#### 1. Characteristics & Descriptions
*   **Félix y Raúl son altos.** — Felix and Raul are tall.
*   **Antón es muy simpático.** — Anton is very nice.
*   **Yo soy alemana.** — I am German. *(Feminine speaker)*
*   **El ratón es matado por el gato.** — The mouse is killed by the cat. *(Passive voice structure)*

#### 2. Origin, Material & Possession
*   **Susana es de Venezuela.** — Susana is from Venezuela. *(Origin)*
*   **Ese anillo es de oro.** — That ring is made of gold. *(Material)*
*   **Ese anillo es de María.** — That ring is Maria's. *(Possession)*

#### 3. Identity, Family & Professions
*   **Clara y Sara son mis hermanas.** — Clara and Sara are my sisters. *(Relationship)*
*   **Estos son mis amigos.** — These are my friends. *(Relationship)*
*   **Elisa es mi esposa.** — Elisa is my spouse. *(Relationship)*
*   **Juan es ingeniero.** — John is an engineer. *(Profession)*

#### 4. Time, Dates, Seasons & Events
*   **¿Qué hora es? Son las diez.** — What time is it? It's ten o'clock. *(Time)*
*   **Hoy es 1 de abril.** — Today is April 1st. *(Date)*
*   **Hoy es domingo.** — Today is Sunday. *(Day)*
*   **Es primavera.** — It's Spring. *(Season)*
*   **Aquí, ya es de noche.** — Here, it's already night. *(Time of day)*
*   **El partido de fútbol es en Barcelona.** — The football match is in Barcelona. *(Note: SER is used for the location of an event)*
*   **El partido es el miércoles.** — The match is on Wednesday. *(Event day)*`
    },
    quiz: {
      title: "Verb SER Conjugation Evaluation",
      questions: [
        {
          text: "Conjugate SER for the subject 'Nosotros':",
          a: "eres", b: "es", c: "somos", d: "son",
          correct: "C"
        },
        {
          text: "Complete: 'Ellas ________ estudiantes de español.'",
          a: "soy", b: "son", c: "es", d: "somos",
          correct: "B"
        },
        {
          text: "Which of the following is a correct usage category of the verb SER?",
          a: "Temporary mood", b: "Physical location", c: "Origin or nationality", d: "Current actions",
          correct: "C"
        }
      ]
    }
  },
  {
    name: "La profesión",
    description: "Explore vocabulary for professions, careers, and occupations.",
    category: "Vocabulary",
    duration: "~20 Mins",
    icon: "bi-briefcase",
    subtopics: [
      "Common Occupations",
      "Stating Your Career",
      "Professional Fields"
    ],
    note: {
      title: "Professions and Occupations",
      content: `### Introduction to Professions in Spanish
Talking about your career or asking others about their work is one of the most common conversational topics. In Spanish, we use the verb **SER** to state our profession (e.g. *Yo soy médico*), and we omit the indefinite article (*un / una*) unless the profession is modified by an adjective (e.g. *Soy un médico famoso*).

---

### Common Occupations (Las Profesiones)
Below is an alphabetically ordered comprehensive list of professions in their masculine and feminine forms:

| Masculine / Feminine Form | English Translation | Note / Grammar Tip |
|---|---|---|
| **El abogado; La abogada** | Lawyer | — |
| **El actor; La actriz** | Actor / Actress | — |
| **El/La agente de viaje** | Travel agent | Gender-neutral ending |
| **El/La albañil** | Mason / Builder | Gender-neutral ending |
| **El ama de casa** (El/La ama de casa) | Homemaker | Uses *el* in singular for phonetic reasons (*ama* starts with stressed 'a-'), but is feminine. |
| **El anfitrión; La anfitriona** | Host / Hostess | — |
| **El apoderado; La apoderada** | Attorney / Proxy | — |
| **El arquitecto; La arquitecta** | Architect | — |
| **El/La asistente** | Assistant | Gender-neutral ending |
| **El autor; La autora** | Author | — |
| **El/La azafata** (El/La azafato/a) | Flight attendant | *La azafata* is standard for female, *el azafato* for male |
| **El bibliotecario; La bibliotecaria** | Librarian | — |
| **El bombero** | Firefighter / Fireman | — |
| **El campesino; La campesina** | Peasant; Farmer | — |
| **El/La cantante** | Singer | Gender-neutral ending |
| **El cantautor; La cantautora** | Lyricist cum singer | — |
| **El carpintero** | Carpenter | — |
| **El cartero; La cartera** | Postman / Postwoman | — |
| **El casero; La casera** | Landlord / Landlady | — |
| **El científico; La científica** | Scientist | — |
| **El/La cineasta** (El/La cineaste) | Filmmaker | Standard spelling: *cineasta*, image lists *cineaste* |
| **El cirujano; La cirujana** | Surgeon | — |
| **El cocinero; La cocinera** | Cook / Chef | — |
| **El conductor; La conductora** | Driver | — |
| **El consejero; La consejera** | Adviser / Counselor | — |
| **El contador; La contadora** | Accountant | — |
| **El criado; La criada** | Servant | — |
| **El/La dentista** | Dentist | Gender-neutral ending |
| **El director; La directora** | Head / Director | — |
| **El diseñador; La diseñadora** | Designer | — |
| **El doctor; La doctora** | Doctor | — |
| **El ejecutivo; La ejecutiva** | Executive | — |
| **El/La electricista** | Electrician | Gender-neutral ending |
| **El empresario; La empresaria** | Entrepreneur / Businessperson | — |
| **El enfermero; La enfermera** | Nurse | — |
| **El escritor; La escritora** | Writer | — |
| **El/La estilista** | Stylist | Gender-neutral ending |
| **El/La fabricante** | Manufacturer | Gender-neutral ending |
| **El florist; La florist** | Florist | Standard spelling: *florista* |
| **El fontanero** | Plumber | — |
| **El fotógrafo; La fotógrafa** (La fotografa) | Photographer | Standard spelling: *fotógrafa* |
| **El/La gerente** | Manager | Gender-neutral ending |
| **El/La guionista** | Screen writer | Gender-neutral ending |
| **El/La jefe** | Boss | *La jefa* is also common |
| **El juez; La jueza** | Judge | — |
| **El lector; La lectora** | Reader | — |
| **El/La letrista** | Lyricist | Gender-neutral ending |
| **El/La líder** | Leader | Gender-neutral ending |
| **El maestro; La maestro** | Master / Teacher | Standard spelling: *maestra* |
| **El mecánico; La mecánica** (La mecanica) | Mechanic | Standard spelling: *mecánica* |
| **El médico; La médica** | Doctor | — |
| **El mesero; La mesera** | Waiter / Waitress | — |
| **El modelo; La modela** | Model | Standard spelling: *El/La modelo* |
| **El panadero** | Baker | — |
| **El peluquero; La peluquera** | Barber / Hairdresser | — |
| **El/La periodista** | Journalist | Gender-neutral ending |
| **El pescador** | Fisherman | — |
| **El pintor; La pintora** | Painter | — |
| **El piloto; La pilota** | Pilot | Standard spelling: *El/La piloto* |
| **El plomero; La plomera** | Plumber | Synonymous with *fontanero* |
| **El poeta; La poetisa** | Poet | — |
| **El/La policía** | Police officer | — |
| **El político; La política** (El politico; La politica) | Politician | Standard spelling uses accent marks |
| **El/La presidente** | Chairman; President | *La presidenta* is also standard |
| **El profesor; La profesora** | Professor / Teacher | — |
| **El propietario; La proprietaria** (La propietaria) | Proprietor | — |
| **El/La psiquiatra** | Psychiatrist | Gender-neutral ending |
| **El/La recepcionista** | Receptionist | Gender-neutral ending |
| **El/La representante** | Representative | Gender-neutral ending |
| **El revisor; La revisora** | Checking inspector | — |
| **El salvavidas** | Lifeguard | Gender-neutral / compound noun |
| **El/La sastre** | Tailor | Gender-neutral ending |
| **El secretario; La secretaria** | Secretary | — |
| **El socio; La socia** | Partner | — |
| **El soldado; La soldada** | Soldier | Standard spelling: *El/La soldado* |
| **El/La sub director** | Deputy director | Standard spelling: *subdirector/a* |
| **El/La taxista** | Taxi driver | Gender-neutral ending |
| **El traductor; La traductora** | Translator | — |
| **El vendedor; La vendedora** | Salesperson | — |
| **El veterinario; La veterinaria** | Veterinarian | — |
| **El/La vice presidente** | Deputy chairman | Standard spelling: *vicepresidente/a* |

---

### Interactive Examples & Inquiries
Practice stating your career and asking others about their occupations:

*   **¿Eres estudiante? Sí, soy estudiante.** — Are you a student? Yes, I'm a student.
*   **¿Son ustedes ingenieros? Sí, somos ingenieros.** — Are you engineers? Yes, we are engineers.
*   **¿Es Mario secretario? No, él no es secretario.** — Is Mario a secretary? No, he is not a secretary.
*   **¿Es María enfermera? Sí, ella es.** — Is María a nurse? Yes, she is.
*   **¿Son Juan y Pedro taxistas? Sí, ellos son.** — Are John and Peter taxi drivers? Yes, they are.

---

### Asking "What" vs. "Who" (Qué vs. Quién)
*   **¿Qué es el señor Mohandoss Karamchand Gandhi? Él es un líder.** — What is Mr. Mohandoss Karamchand Gandhi? He is a leader. *(Note: "Qué" is used to ask about a person's role/profession)*
*   **¿Qué es Ravi varma? Él es un pintor.** — What is Ravi varma? He is a painter.
*   **¿Quién es Chetan Bhagat? Chetan Bhagat es un novelista.** — Who is Chetan Bhagat? Chetan Bhagat is a novelist. *(Note: "Quién" is used to ask about identity)*`
    },
    quiz: {
      title: "Professions Vocabulary Quiz",
      questions: [
        {
          text: "Translate 'The lawyer' (feminine) into Spanish:",
          a: "el abogado", b: "la abogada", c: "la médica", d: "la profesora",
          correct: "B"
        },
        {
          text: "What does 'camarero' mean?",
          a: "Chef", b: "Nurse", c: "Waiter", d: "Doctor",
          correct: "C"
        },
        {
          text: "Which sentence is grammatically correct for stating 'I am a doctor' (masculine)?",
          a: "Soy un médico.", b: "Soy médico.", c: "Soy el médico.", d: "Tengo médico.",
          correct: "B"
        }
      ]
    }
  },
  {
    name: "Grammar",
    description: "Comprehensive Spanish grammar module covering regular/irregular verbs, adjectives, pronouns, sentence structures, tenses, prepositions, reflexive verbs, and advanced grammar patterns.",
    category: "Grammar",
    duration: "~20 Mins",
    icon: "bi-journal-code",
    subtopics: ["Los verbos (regulares)", "El verbo TENER (irregular)", "Los adjetivos", "Los demostrativos", "Los adjetivos posesivos", "SER vs ESTAR", "Los interrogativos", "Los verbos pronominales", "MUY vs MUCHO", "Los indefinidos", "Las preposicionales", "Los verbos irregulares", "Los verbos que solo cambian en “YO”", "SABER vs CONOCER", "El presente contínuo [Estar + Gerundio]", "Las perífrasis verbales", "Los verbos reflexivos"],
    note: {
      title: "Spanish Grammar Foundations",
      content: `Unlock regular verb conjugations and basic adjective rules in Spanish.

### Conjugating Regular Verbs in Present Tense
Spanish verbs end in **-ar**, **-er**, or **-ir**. Remove this suffix and append:

| Subject | -ar (e.g. Hablar) | -er (e.g. Comer) | -ir (e.g. Vivir) |
|---|---|---|---|
| **Yo** | -o (*hablo*) | -o (*como*) | -o (*vivo*) |
| **Tú** | -as (*hablas*) | -es (*comes*) | -es (*vives*) |
| **Él/Ella/Ud.** | -a (*habla*) | -e (*come*) | -e (*vive*) |
| **Nosotros** | -amos (*hablamos*) | -emos (*comemos*) | -imos (*vivimos*) |
| **Ellos/Uds.** | -an (*hablan*) | -en (*comen*) | -en (*viven*) |

### Adjective Agreement
Adjectives must agree in gender and number with the nouns they modify:
- *El libro rojo* (The red book)
- *La casa roja* (The red house)
- *Los libros rojos* (The red books)
- *Las casas rojas* (The red houses)`
    },
    quiz: {
      title: "Comprehensive Grammar Assessment",
      questions: [
        {
          text: "Conjugate the verb 'vivir' (to live) for 'Nosotros':",
          a: "vivimos", b: "vivemos", c: "viven", d: "vivo",
          correct: "A"
        },
        {
          text: "What is the correct translation of 'the white tables' (tables is 'mesas' - feminine plural)?",
          a: "las mesas blancos", b: "las mesas blancas", c: "los mesas blancos", d: "unas mesas blanco",
          correct: "B"
        },
        {
          text: "How is the verb 'comer' conjugated for 'Tú'?",
          a: "como", b: "comes", c: "comen", d: "come",
          correct: "B"
        }
      ]
    }
  },
  {
    name: "Los días de la semana",
    description: "Learn the days of the week and how to use them naturally in conversation.",
    category: "Vocabulary",
    duration: "~20 Mins",
    icon: "bi-calendar-week",
    note: {
      title: "Days of the Week in Spanish",
      content: `### The Days of the Week (Los días de la semana)

| Spanish Day | English Translation |
|---|---|
| **Domingo** | Sunday |
| **Lunes** | Monday |
| **Martes** | Tuesday |
| **Miércoles** | Wednesday |
| **Jueves** | Thursday |
| **Viernes** | Friday |
| **Sábado** | Saturday |

---

### Important Calendar Notes
- **Hay treinta días y cuatro semanas en un mes.** (There are thirty days and four weeks in a month.)
- **Una semana tiene siete días.** (One week has seven days.)
- **Los días de la semana son domingo, lunes, martes, miércoles, jueves, viernes y sábado.** (The days of the week are Sunday, Monday, Tuesday, Wednesday, Thursday, Friday and Saturday.)

---

### Grammar Guidelines
1. Days of the week are **always masculine** and use *el* (singular) or *los* (plural): *el lunes* (on Monday), *los sábados* (on Saturdays).
2. Unlike in English, the days of the week are **not capitalized** in Spanish unless they begin a sentence.`
    },
    quiz: {
      title: "Days of the Week Quiz",
      questions: [
        {
          text: "What is the Spanish word for Friday?",
          a: "martes", b: "jueves", c: "viernes", d: "domingo",
          correct: "C"
        },
        {
          text: "How do you say 'on Saturdays' in Spanish?",
          a: "en sábados", b: "el sábado", c: "los sábados", d: "de sábados",
          correct: "C"
        },
        {
          text: "Which day comes directly after 'miércoles'?",
          a: "martes", b: "jueves", c: "lunes", d: "viernes",
          correct: "B"
        }
      ]
    }
  },
  {
    name: "Los colores",
    description: "Practice colors, descriptive vocabulary, and visual expression in Spanish.",
    category: "Vocabulary",
    duration: "~20 Mins",
    icon: "bi-palette",
    note: {
      title: "Spanish Colors and Adjectives",
      content: `### Vocabulary (Los colores)

| Spanish Term | English Translation | Note / Grammar Variation |
|---|---|---|
| **El matiz** | Hue | — |
| **Verde** | Green | Plural: *verdes* |
| **Violeta** | Violet | — |
| **Castaño/a** | Brown | Typically used for hair/eyes |
| **Rojo/a** | Red | — |
| **Dorado/a** | Golden | — |
| **Luminoso/a** | Shiny | — |
| **Rosa** | Pink | — |
| **Naranja** | Orange | — |
| **Marrón** | Brown | Plural: *marrones* |
| **Negro/a** | Black | — |
| **Amarillo/a** | Yellow | — |
| **Plateado/a** | Silvery | — |
| **Brillante** | Bright / Brilliant | — |
| **Azul** | Blue | Plural: *azules* |
| **Gris** | Grey | Plural: *grises* |
| **Café** | Brown | Literally *coffee* |
| **Blanco/a** | White | — |
| **Morado/a** | Purple | — |
| **Oscuro/a** | Dark | — |

---

### Examples & Descriptive Phrases
- **El cielo azul** (Blue sky)
- **La nube blanca** (White cloud)
- **El pelo negro** (Black hair)
- **El bolígrafo verde** (Green pen)
- **Las camisas amarillas** (Yellow shirts)
- **El coche blanco** (White car)
- **La falda azul** (Blue skirt)
- **Pantalones verdes** (Green pants)

---

### Important Grammar Tips
1. In Spanish, colors are adjectives and usually **follow the noun** they describe.
2. Colors must **agree in gender** (masculine/feminine) and **number** (singular/plural) with the noun:
   - *El coche blanco* (singular masculine)
   - *Las camisas amarillas* (plural feminine)
3. Colors ending in **-e** or a consonant (like *verde*, *azul*, *gris*) only change for number, not gender:
   - *El bolígrafo verde* / *La mesa verde*
   - *Pantalones verdes* / *Las sillas verdes*`
    },
    quiz: {
      title: "Spanish Colors Quiz",
      questions: [
        {
          text: "What is the feminine plural of 'rojo'?",
          a: "rojos", b: "rojas", c: "roja", d: "rojoes",
          correct: "B"
        },
        {
          text: "What color is 'azul'?",
          a: "Red", b: "Yellow", c: "Blue", d: "Green",
          correct: "C"
        },
        {
          text: "How do you make the color 'gris' plural?",
          a: "grises", b: "gris", c: "griss", d: "griseses",
          correct: "A"
        }
      ]
    }
  },
  {
    name: "Vocabularios de la casa",
    description: "Learn household vocabulary including rooms, furniture, and home-related objects.",
    category: "Vocabulary",
    duration: "~20 Mins",
    icon: "bi-house",
    subtopics: [
      "House & Structure",
      "Rooms & Living Spaces",
      "Furniture & Facilities",
      "Outdoor Area"
    ],
    note: {
      title: "Rooms & Furniture Vocabulary",
      content: `### Overview
Building a strong vocabulary of household terms is essential for describing your home and daily living environments.

---

### 1. House & Structure (La estructura de la casa)
| Spanish Term | English Translation | Usage Notes / Contractions |
|---|---|---|
| **La casa / El hogar** | House; Home; Shelter; Abode | — |
| **El techo / El tejado** | Roof | — |
| **La pared / El muro** | Wall | *Muro* typically denotes a castle wall or boundary wall |
| **El piso / El suelo** | Floor | *Piso* can also mean apartment |
| **El cielo** | Ceiling; Sky; Heaven | — |
| **La ventana / La ventanilla** | Window | *Ventanilla* is typically a ticket counter or box office window |
| **La estantería / La repisa** | Shelf | *Estantería* is primarily used for shelving books |
| **La escalera** | Staircase | — |

---

### 2. Rooms & Living Spaces (Habitaciones y estancias)
| Spanish Term | English Translation | Usage Notes |
|---|---|---|
| **La habitación / La sala / El cuarto** | Room | *Habitación* is often used as a business word in the hospitality field |
| **La sala** | Room; Hall | — |
| **La cocina** | Kitchen | — |
| **El baño** | Bathroom | — |
| **El trastero** | Store room | — |
| **La veranda** | Veranda | — |
| **La terraza** | Terrace | — |
| **La sala de estudio** | Study room | — |
| **El comedor** | Dining room | — |
| **El dormitorio** | Bedroom | — |
| **El ático** | Attic | — |
| **El balcón** | Balcony | — |

---

### 3. Furniture & Facilities (Muebles e instalaciones)
| Spanish Term | English Translation | Usage Notes |
|---|---|---|
| **El escritorio** | Writing desk | — |
| **La cama** | Bed | — |
| **El catre** | Cot | — |
| **El aseo** | Toilet | — |
| **Los servicios** | Restroom | Often used in plural form |
| **El pórtico** | Portico | — |

---

### 4. Outdoor Area (El exterior de la casa)
| Spanish Term | English Translation |
|---|---|
| **El jardín** | Garden (In general) |
| **El césped** | Lawn |
| **El huerto** | Vegetable garden |`
    },
    quiz: {
      title: "Household Vocabulary Quiz",
      questions: [
        {
          text: "Where do you cook food in a Spanish home?",
          a: "el dormitorio", b: "la cocina", c: "el baño", d: "el jardín",
          correct: "B"
        },
        {
          text: "What does 'la cama' represent?",
          a: "The table", b: "The chair", c: "The bed", d: "The door",
          correct: "C"
        },
        {
          text: "Translate 'living room' to Spanish:",
          a: "el salón", b: "la cocina", c: "el baño", d: "el jardín",
          correct: "A"
        }
      ]
    }
  },
  {
    name: "Las emociones",
    description: "Express emotions, feelings, moods, and emotional states naturally in Spanish.",
    category: "Vocabulary",
    duration: "~20 Mins",
    icon: "bi-emoji-smile",
    subtopics: [
      "Blissful Emotions",
      "Sad Emotions",
      "Angry & Fearful Emotions",
      "Miscellaneous Emotions"
    ],
    note: {
      title: "Expressing Emotions with ESTAR",
      content: `### Overview
Emotions and feelings are temporary states, so they are expressed using the verb **ESTAR** (to be) instead of **SER**. 

Adjectives ending in **-o/-a** must agree in gender with the subject (e.g. *Estoy cansado* for a male speaker, *Estoy cansada* for a female speaker).

---

### 1. Blissful Emotions (Emociones alegres)
| Spanish Term | English Translation | Note |
|---|---|---|
| **Encantado/a** | Delighted | — |
| **Alegre / Feliz** | Happy | Plural: *felices* |
| **Paciente** | Patient | Gender neutral |
| **Relajado/a** | Relaxed | — |
| **Satisfecho/a** | Satisfied | — |

---

### 2. Sad Emotions (Emociones tristes)
| Spanish Term | English Translation | Note |
|---|---|---|
| **Deprimido/a** | Depressed | — |
| **Triste** | Sad | Gender neutral |
| **Preocupado/a** | Worried | — |
| **Agobiado/a** | Overwhelmed | — |
| **Desesperado/a** | Desperate | — |

---

### 3. Angry & Fearful Emotions (Emociones de enojo y miedo)
| Spanish Term | English Translation | Note |
|---|---|---|
| **Enfadado/a** | Angry | — |
| **Asustado/a** | Frightened | — |
| **Ansioso/a** | Anxious | — |
| **Celoso/a** | Jealous; Envious | — |
| **Estresado/a** | Stressed | — |
| **Emocionado/a** | Excited | — |
| **Enamorado/a** | Fell in love | — |
| **Orgulloso/a** | Proud | — |
| **Aliviado/a** | Relieved | — |
| **Agradecido/a** | Grateful; Thankful | — |
| **Dolido/a** | Hurt | — |
| **Infeliz** | Unhappy | Gender neutral |
| **Incómodo/a** | Uncomfortable | — |
| **Avergonzado/a** | Ashamed | — |
| **Inseguro/a** | Insecure | — |
| **Frustrado/a** (Frustado/a) | Frustrated | — |
| **Furioso/a** | Furious | — |
| **Impaciente** | Impatient | Gender neutral |
| **Nervioso/a** | Nervous | — |
| **Doloroso/a** | Painful | — |

---

### 4. Miscellaneous Emotions (Otras emociones)
| Spanish Term | English Translation | Note |
|---|---|---|
| **Ocupado/a** | Busy | — |
| **Confundido/a** | Confused | — |
| **Tímido/a** | Timid; Shy | — |
| **Optimista** | Optimistic | Gender neutral |
| **Cansado/a** | Tired | — |
| **Cómodo/a** | Comfortable | — |
| **Sensible** | Sensitive | Gender neutral (does not mean *sensible* in English) |
| **Sorprendido/a** | Surprised | — |
| **Pesimista** (Pessimista) | Pessimistic | Gender neutral |
| **Inquieto/a** | Restless | — |`
    },
    quiz: {
      title: "Emotions & Feelings Quiz",
      questions: [
        {
          text: "If a girl is tired, what does she say?",
          a: "Estoy cansado.", b: "Estoy cansada.", c: "Soy cansada.", d: "Soy cansado.",
          correct: "B"
        },
        {
          text: "Complete: 'Nosotros ________ preocupados por el examen.'",
          a: "somos", b: "estamos", c: "está", d: "están",
          correct: "B"
        },
        {
          text: "What does 'aburrido' mean?",
          a: "Excited", b: "Bored", c: "Angry", d: "Happy",
          correct: "B"
        }
      ]
    }
  },
  {
    name: "Las direcciones",
    description: "Learn how to ask and give directions, navigate places, and communicate location-based instructions.",
    category: "Conversation",
    duration: "~20 Mins",
    icon: "bi-compass",
    subtopics: [
      "Conversational Phrases",
      "Verbs & Commands",
      "Streets & Structures",
      "Key Questions"
    ],
    note: {
      title: "Asking for & Giving Directions",
      content: `### Overview
Telling others how to get to a location, understanding commands, and navigating streets are crucial conversation skills.

---

### 1. Conversational Phrases (Frases útiles)
| Spanish Term | English Translation | Note |
|---|---|---|
| **Discúlpeme** | Excuse me | Polite opener |
| **Perdóneme** | Pardon me | Polite opener |
| **Lo siento** | I am sorry | Expressing regret |
| **Yo no sé** | I don't know | — |
| **Yo sé** | I know | — |
| **¿Sabe?** | Do you know? | — |
| **Aquí / acá** | Here | — |
| **Por aquí / acá** | Nearby / This way | — |
| **Fácil** | Easy | — |
| **Difícil** | Difficult | — |
| **Cerca** | Close / Near | — |
| **Lejos** | Far | — |
| **Hay** | There is; There are | — |
| **¿Hay?** | Is there?; Are there? | Inquiry |

---

### 2. Verbs & Directional Commands (Verbos y mandatos)
| Spanish Infinitive | English Translation | Imperative Command | English Command |
|---|---|---|---|
| **Ir** | To go | **¡Va!** (or *¡Ve!*) | Go! |
| **Seguir** | To follow / proceed | **¡Sigue recto!** | Proceed / Follow straight! |
| **Continuar** | To continue | **¡Continúa!** | Continue! |
| **Girar** | To turn | **¡Gira!** | Turn! |
| **Torcer** | To twist / bend | **¡Tuerce!** | Turn / Bend! |
| **Cruzar** | To cross | **¡Cruza!** | Cross! |
| **Coger** | To take / catch | **¡Coge!** | Take / Catch! |
| **Tomar** | To take | **¡Toma!** | Take! |
| **Subir** | To go up | **¡Sube!** | Go up! |
| **Bajar** | To get down | **¡Baja!** | Get down! |

---

### 3. Streets & Structures (Vías y elementos)
| Spanish Noun | English Translation |
|---|---|
| **La cuadra** | Block; Ward |
| **La senda / El camino** | Path; Trail |
| **La ruta** | Route |
| **La calle** | Street |
| **Los rascacielos** | Skyscrapers |
| **El semáforo** | Traffic light |
| **La intersección** | Intersection |
| **El puente** | Bridge |
| **El fondo** | Bottom / Background |
| **La plaza** | Square |
| **La carretera** | Highway; Road |
| **Los edificios** | Buildings |
| **La avenida** | Avenue |
| **El Cruce** | Crossroad |
| **El parque** | Park |
| **La final / El final** | The end |
| **El lado** | Next / Side |

---

### 4. Directional Positioning (Indicadores de posición)
- **A la derecha** – To/on the right
- **A la izquierda** – To/on the left
- **Recto** – Straight / Straight on / Straight ahead
- **Al lado de** – Next to
- **Al final de** – At the end of

---

### 5. Key Questions (Preguntas clave)
- **¿Dónde está…?** – Where is…?
- **¿Dónde están…?** – Where are…?
- **¿Dónde hay…… aquí?** – Where is there…… here?
- **¿Hay……. por aquí?** – Is there……. nearby?
- **¿Está lejos?** – Is it far?
- **¿Está cerca?** – Is it near?`
    },
    quiz: {
      title: "Directions & Travel Navigation Quiz",
      questions: [
        {
          text: "What does 'todo recto' mean?",
          a: "Turn left", b: "Straight ahead", c: "Stop here", d: "Turn right",
          correct: "B"
        },
        {
          text: "How do you ask 'Where is the train station?'",
          a: "¿Cómo estás?", b: "¿Dónde está la estación de tren?", c: "Quiero ir al cine", d: "Cruza la calle",
          correct: "B"
        },
        {
          text: "Which word means 'Right' in directional vocabulary?",
          a: "Izquierda", b: "Todo recto", c: "Derecha", d: "Cerca",
          correct: "C"
        }
      ]
    }
  },
  {
    name: "Expresar la hora",
    description: "Master telling time, asking time-related questions, and using time expressions.",
    category: "Conversation",
    duration: "~20 Mins",
    icon: "bi-clock",
    subtopics: [
      "Asking & Telling Time",
      "Hourly Examples Table",
      "Meeting 'At' a Time",
      "Vocabulary Nuances"
    ],
    note: {
      title: "Telling Time in Spanish",
      content: `### Asking & Telling Time
To ask "What time is it?" in Spanish, we say:
- **¿Qué hora es?**

To tell the time, the verb **SER** goes before the time:
- Use **Es la** for one o'clock (singular, e.g. *Es la una*).
- Use **Son las** for all other hours (plural, e.g. *Son las dos*, *Son las tres*).
- The article is always feminine (*la* or *las*) because it refers to **la hora** (the hour).

When it is not exactly on the hour, we can express minutes by adding them (*y*) or subtracting them (*menos* from the next hour):
- **1:40** = *es la una y cuarenta* (one forty) OR *son las dos menos veinte* (twenty minutes to two).
- **1:45** = *es la una y cuarenta y cinco* (one forty five) OR *son las dos menos cuarto* (quarter to two).

---

### Hourly Examples & Time-of-Day
| Time | Spanish Phrase | English Translation |
|---|---|---|
| **04:00** | Son las cuatro de la madrugada | Four 'O' clock in the early morning |
| **06:00** | Son las seis de la mañana | Six 'O' clock in the morning |
| **07:00** | Son las siete | Seven 'O' clock |
| **08:00** | Son las ocho | Eight 'O' clock |
| **09:00** | Son las nueve | Nine 'O' clock |
| **10:00** | Son las diez | Ten 'O' clock |
| **11:00** | Son las once | Eleven 'O' clock |
| **12:00** | Son las doce del mediodía | Twelve 'O' clock in the noon |
| **13:00** | Es la una | One 'O' clock noon |
| **13:40** | Es la una y cuarenta | One forty |
| **13:40** | Son las dos menos veinte | Twenty minutes to two |
| **13:45** | Es la una y cuarenta y cinco | One forty five |
| **13:45** | Son las dos menos cuarto | Quarter to two |
| **14:00** | Son las dos de la tarde | Two 'O' clock in the afternoon |
| **14:10** | Son las dos y diez | Ten past two |
| **14:15** | Son las dos y cuarto | Quarter past two |
| **14:30** | Son las dos y media | Half past two |
| **15:00** | Son las tres | Three 'O' clock |
| **16:00** | Son las cuatro | Four 'O' clock |
| **17:00** | Son las cinco de la tarde | Five 'O' clock in the evening |
| **20:00** | Son las ocho de la noche | Eight 'O' clock in the night |
| **00:00** | Son las doce de la medianoche | Twelve 'O' clock in the midnight |

> [!IMPORTANT]
> **Cultural Note on Night/Evening**: 
> In most English-speaking countries, we'd probably start talking about "the night/evening" around 6:00 PM. However, in many Spanish-speaking countries, we wouldn't pronounce **de la noche** until around **8:00 PM** (until then, 5:00 PM or 7:00 PM is typically referred to as **de la tarde**).

---

### Meeting "At" a Time
When describing when a class starts or when you will meet someone (using "at" in English), use **a la** (for 1:00) or **a las** (for all other hours) in Spanish:
- *Tengo mi clase de español **a la** una.* (I have my Spanish class at one.)
- *¿Nos encontramos **a las** siete de la mañana?* (Shall we meet at seven in the morning?)

You might also hear:
- **Es el mediodía** (It is noon)
- **Es la medianoche** (It is midnight)

---

### Vocabulary Nuances: Tiempo vs. Hora
Even though **tiempo** translates to "time" in English, it often signifies *weather* in Spanish:
- **Never** use the word *tiempo* to ask the time (do not say *¿Qué tiempo es?* or *¿Tiene tiempo?*).
- Use **tiempo** for weather (e.g. *¿Qué tiempo hace?* - How is the weather?) or duration/span of time.
- In many Spanish-speaking countries, the 24-hour clock is widely used (especially in schedules and timetables), which avoids the need to clarify morning/afternoon. But in regular speech, clarify using *de la mañana*, *de la tarde*, or *de la noche*.*`
    },
    quiz: {
      title: "Telling Time Evaluation",
      questions: [
        {
          text: "How do you say 'It is 1:00' in Spanish?",
          a: "Son las una.", b: "Es la una.", c: "Es las dos.", d: "Son las una y media.",
          correct: "B"
        },
        {
          text: "Translate 'It is 3:30':",
          a: "Son las tres y media.", b: "Es la una y media.", c: "Son las tres menos cuarto.", d: "Son las cuatro y cuarto.",
          correct: "A"
        },
        {
          text: "What does 'Son las cinco menos cuarto' mean?",
          a: "It is 5:15", b: "It is 4:45", c: "It is 5:30", d: "It is 4:15",
          correct: "B"
        }
      ]
    }
  },
  {
    name: "Los meses del año",
    description: "Learn months, dates, seasons, and calendar-related vocabulary.",
    category: "Vocabulary",
    duration: "~20 Mins",
    icon: "bi-calendar2-range",
    subtopics: [
      "Twelve Months",
      "Time Intervals",
      "Relative Time & Dates",
      "Days & Time-of-Day Vocab"
    ],
    note: {
      title: "Months, Dates & Calendars",
      content: `### 1. Twelve Months (Los doce meses del año)
Months in Spanish are grammatically masculine (using the article **el**) and are **not capitalized** in standard writing.

| Spanish Month | English Translation |
|---|---|
| **(El) enero** | January |
| **(El) febrero** | February |
| **(El) marzo** | March |
| **(El) abril** | April |
| **(El) mayo** | May |
| **(El) junio** | June |
| **(El) julio** | July |
| **(El) agosto** | August |
| **(El) septiembre** | September |
| **(El) octubre** | October |
| **(El) noviembre** | November |
| **(El) diciembre** | December |

---

### 2. Time Intervals (Intervalos de tiempo)
- **Un segundo** – 1 second
- **Un minuto** – 1 minute
- **Una hora** – 1 hour
- **Veinticuatro horas** – 24 hours
- **Sesenta segundos** – 60 seconds
- **Sesenta minutos** – 60 minutes
- **Milisegundos** – Milliseconds
- **Un día** – A day
- **La semana** – Week
- **El mes** – Month
- **El año** – Year
- **El año bisiesto** – Leap year
- **El siglo** – Century

---

### 3. Relative Time & Dates (El paso del tiempo)
| Spanish Term | English Translation |
|---|---|
| **El antes ayer** (or *Anteayer*) | The day before yesterday |
| **El ayer** | Yesterday |
| **El hoy** | Today |
| **El pasado mañana** | Day after tomorrow |
| **Anoche** | Last night |
| **Ahora** | Now |
| **Luego** | Later |
| **Esta noche** | Tonight |
| **Esta semana** | This week |
| **La semana pasada** | Last week |
| **La próxima semana** | Next week |
| **Este mes** | This month |
| **El mes pasado** | Last month |
| **El próximo mes** | Next month |
| **El fin de semana** | Weekend |
| **El fin de semana pasado** | Last weekend |
| **El próximo fin de semana** | Next weekend |
| **El próximo año** | Next year |
| **El próximo siglo** | Next century |

---

### 4. Days & Time-of-Day Vocab (Momentos del día y frecuencia)
- **La mañana** – Morning
- **El mediodía** – Noon
- **La tarde** – Evening / Afternoon
- **La medianoche** – Midnight
- **La madrugada** – Early morning
- **Diariamente** – Daily
- **Todos los días** – Everyday
- **Hoy en día** – Nowadays`
    },
    quiz: {
      title: "Months and Dates Assessment",
      questions: [
        {
          text: "Translate 'December' to Spanish:",
          a: "noviembre", b: "enero", c: "diciembre", d: "febrero",
          correct: "C"
        },
        {
          text: "How do you say 'May 5th' in Spanish?",
          a: "el cinco mayo", b: "el cinco de mayo", c: "en cinco de mayo", d: "cinco de mayo",
          correct: "B"
        },
        {
          text: "What is 'January' in Spanish?",
          a: "enero", b: "febrero", c: "marzo", d: "abril",
          correct: "A"
        }
      ]
    }
  },
  {
    name: "Vocabularios de la familia",
    description: "Practice family relationships, family vocabulary, and relationship expressions.",
    category: "Vocabulary",
    duration: "~20 Mins",
    icon: "bi-people",
    subtopics: [
      "Kinship & Immediate Family",
      "Extended Family & In-Laws",
      "Relationships & Status",
      "Ser vs. Estar with Family"
    ],
    note: {
      title: "Family Tree Vocabulary",
      content: `### Overview
Understanding relationship descriptors and family status terms is central to describing your background and social circles in Spanish.

---

### 1. Kinship & Immediate Family (Parentesco y familia directa)
| Spanish Term | English Translation |
|---|---|
| **El parentesco** | Kinship |
| **Los parientes** | Relatives; kins |
| **Los padres** | Parents |
| **El padre / La madre** | Father / Mother |
| **Papá / Mamá** | Dad / Mom |
| **Materno / paterno** | Maternal / Paternal |
| **Hermano/a** | Brother / Sister |
| **Hijo/a** | Son / Daughter |

---

### 2. Extended Family & In-Laws (Familia extendida y familia política)
| Spanish Term | English Translation |
|---|---|
| **Abuelo/a** | Grandfather / Grandmother |
| **Bisabuelo/a** | Great grandfather / Great grandmother |
| **Tío/a** | Uncle / Aunt |
| **Primo/a** | Cousin |
| **Sobrino/a** | Nephew / Niece |
| **Suegro/a** | Father-in-law / Mother-in-law |
| **Cuñado/a** | Brother-in-law / Sister-in-law |
| **Yerno / Nuera** | Son-in-law / Daughter-in-law |

---

### 3. Relationships & Status (Relaciones y estado civil)
| Spanish Term | English Translation |
|---|---|
| **Soltero/a** | Single |
| **El/La amante** | Lover |
| **La pareja** | Couple |
| **Prometido/a** | Fiancé |
| **Matrimonio** | Matrimony / Marriage |
| **Novio/a** | Boyfriend / Girlfriend (or Bridegroom / Bride) |
| **Casado/a** | Married |
| **Marido / Hombre** | Husband / Man |
| **La mujer** | Wife / Woman |
| **Esposo/a** | Spouse |
| **Divorciado/a** | Divorcé / Divorced |
| **Viudo/a** | Widower / Widow |

---

### 4. Ser vs. Estar with Family (Grammar Note)
As per standard Spanish grammar rules, **SER** is used to talk about family and blood relatives (permanent identity ties), whereas **ESTAR** is often used to talk about non-family, non-blood relatives, or marital states. 
*Note: In modern conversational Spanish, speakers frequently shuffle between these two verbs based on the emphasis they want to make.*

#### Examples:
- **Ella es mi mamá** – She is my mom (blood relative)
- **Ella es mi hermana mayor** – She is my big sister (blood relative)
- **Ella es mi tía materna** – She is maternal aunt (blood relative)
- **Él está mi amigo** – He is my friend (non-blood)
- **Él está mi prometido** – He is my fiancé (non-blood status)
- **Él es mi hombre** – He is my man [Husband]
- **Él está mi esposo** – He is my spouse
- **Ella es mi mujer** – She is my woman [Wife]
- **Ella está mi esposa** – She is my spouse  
- **Ellos son casados** – They both are married (characterizes their identity status)
- **Ellos están casados** – They both are married (characterizes their marital state)
- **Él es viudo** – He is a widower
- **Ella está divorciada** – She is divorced`
    },
    quiz: {
      title: "Family Relationships Quiz",
      questions: [
        {
          text: "What is your father's sister to you?",
          a: "la abuela", b: "la tía", c: "la hermana", d: "la prima",
          correct: "B"
        },
        {
          text: "What does 'el hermano' mean?",
          a: "The son", b: "The brother", c: "The uncle", d: "The grandfather",
          correct: "B"
        },
        {
          text: "Translate 'daughter' to Spanish:",
          a: "el hijo", b: "la hija", c: "la hermana", d: "la madre",
          correct: "B"
        }
      ]
    }
  },
  {
    name: "El clima y la estación",
    description: "Learn weather vocabulary, climate expressions, and seasons in Spanish.",
    category: "Vocabulary",
    duration: "~20 Mins",
    icon: "bi-cloud-sun",
    subtopics: [
      "The Four Seasons",
      "Weather with Ser & Estar",
      "Phrases with Hace & Forecasts",
      "Dates with Ser & Estar"
    ],
    note: {
      title: "Seasons & Weather Expressions",
      content: `### 1. The Four Seasons (Las estaciones del año)
The four main seasons in Spanish are:
- **El verano** – Summer
- **El invierno** – Winter
- **La primavera** – Spring
- **El otoño** – Autumn / Fall

---

### 2. Describing Weather and Seasons using SER vs. ESTAR
Both verbs are extremely useful for talking about the weather and seasons, but they carry distinct meanings:
- **ESTAR** is used to describe **temporary weather conditions** (how the weather is like at a given moment).
  - *El clima está caliente en Madrás.* (The weather is hot in Madras — signifies it is hot right now, but it may change soon).
- **SER** is used for **general, permanent descriptions** (what the weather is generally like).
  - *El clima es caliente en Madrás.* (The weather is hot in Madras — signifies it is generally/typically hot).

---

### 3. Sentence Structure for Seasons
Spanish sentences describing the seasons usually follow this structure:
> **Definite Article + Season/Weather (Tiempo) + SER + Adjective**

*Examples:*
- **La primavera es hermosa.** [The spring is beautiful]
- **El otoño es colorido.** [The autumn is colorful]
- **El verano es una estación muy caliente.** [The summer is a very hot season]
- **El invierno es una estación muy fría.** [The winter is a very cold season]

---

### 4. Did You Know? (¿Sabías que...?)
La mayoría de los países de América Latina son países tropicales, así que solo tienen dos estaciones al año:
- **La estación seca** (The dry season)
- **La estación lluviosa** (The rainy/wet season)

---

### 5. HACE + Weather Conditions
A very common way to describe weather in Spanish is using the verb **HACER** in the third person singular form (**Hace**), followed by a noun:
- **Hace calor** (It is hot)
- **Hace frío** (It is cold)
- **Hace sol** (It is sunny)
- **Hace viento** (It is windy)

---

### 6. Forecasts and Current Weather
Other ways to state what the weather is like include:
- **Hay un clima + weather condition** (There is a... climate)
- **El tiempo está + weather condition** (The weather is...)

*Examples:*
- **Hay un clima soleado esta mañana.** (There is a sunny climate this morning.)
- **Hay un clima lluvioso esta tarde.** (There is a rainy climate this afternoon/evening.)
- **¿Cómo está el clima hoy?** (How is the climate today?)
  - *El clima está caluroso hoy / El clima está caliente hoy.* (The weather is hot today.)
- **¿Qué tiempo hace hoy?** (How is the weather today?)
  - *Hace frío hoy / El tiempo está frío hoy.* (The weather is cold today.)

---

### 7. Stating Dates: SER vs. ESTAR
You can mention the date and day in two ways:
- **Using SER** (3rd person singular):
  - *Hoy es 10 de octubre de 2023.* (Today is October 10th, 2023.)
- **Using ESTAR** (1st person plural — "we are at"):
  - *Hoy estamos a 10 de octubre de 2023.* (Today we are at October 10th, 2023.)`
    },
    quiz: {
      title: "Weather & Seasons Quiz",
      questions: [
        {
          text: "How do you say 'It is hot' in Spanish?",
          a: "Hace frío.", b: "Hace calor.", c: "Está sol.", d: "Es calor.",
          correct: "B"
        },
        {
          text: "Which word represents 'Winter'?",
          a: "la primavera", b: "el verano", c: "el invierno", d: "el otoño",
          correct: "C"
        },
        {
          text: "What does 'llueve' mean?",
          a: "It snows", b: "It rains", c: "It is windy", d: "It is sunny",
          correct: "B"
        }
      ]
    }
  },
  {
    name: "Los vocabularios de la geografía",
    description: "Explore geography-related vocabulary including landscapes, directions, and natural features.",
    category: "Vocabulary",
    duration: "~20 Mins",
    icon: "bi-map",
    subtopics: [
      "Landscapes & Landforms",
      "Water Features",
      "Flora & Vegetation",
      "Climate & Celestial Bodies",
      "Directions & Coordinates"
    ],
    note: {
      title: "Geography & Nature Vocabulary",
      content: `### Overview
Describing geographical formations, coordinates, natural spaces, and flora is essential for discussions about travel, nature, and the environment.

---

### 1. Landscapes & Landforms (El paisaje y el relieve)
| Spanish Term | English Translation |
|---|---|
| **La geografía** | Geography |
| **Natural** | Natural |
| **El mundo** | World |
| **La tierra** | Earth; Land; Soil |
| **El continente** | Continent |
| **La isla** | Island |
| **La montaña** | Mountain |
| **La colina** | Hill |
| **La cima** | Peak |
| **El valle** | Valley |
| **La peña** | Rock |
| **La piedra** | Stone |
| **La piedrita** | Pebble |
| **El desierto** | Desert |
| **La llanura** | Plain |
| **La tierras de cultivo** | Farmland |
| **El terremoto** | Earthquake |

---

### 2. Water Features (Cuerpos de agua)
| Spanish Term | English Translation |
|---|---|
| **El océano** | Ocean |
| **El mar** | Sea |
| **La ola** | Wave |
| **La costa** | Coast |
| **La laguna** | Lagoon |
| **La fuente** | Fountain |
| **La cascada** | Waterfall |
| **El río** | River |
| **La represa** | Dam |
| **El lago** | Lake |
| **El estanque** | Pond; Tank |
| **El agua** | Water |

---

### 3. Flora & Vegetation (La flora y la vegetación)
| Spanish Term | English Translation |
|---|---|
| **El bosque** | Forest |
| **La finca** | Estate |
| **El jardín** | Garden |
| **El árbol** | Tree |
| **La planta** | Plant |
| **La enredadera** | Creeper |
| **La hoja** | Leaf |
| **La semilla** | Seeds |

---

### 4. Climate & Celestial Bodies (El tiempo, el clima y el espacio)
| Spanish Term | English Translation |
|---|---|
| **El tiempo** | Weather |
| **El clima** | Climate |
| **El calor** | Hot / Heat |
| **Caliente** | Warm |
| **Luminoso** | Bright |
| **Soleado** | Sunny |
| **El frío** | Cold |
| **El fresco** | Chill |
| **El rocío** | Dew |
| **La nube** | Cloud |
| **La lluvia** | Rain |
| **Los truenos** | Thunder |
| **El rayo** | Thunderbolt |
| **El aire; El gas** | Air; Gas |
| **El viento** | Wind |
| **Viento / Ventoso** | Windy |
| **La tormenta** | Storm |
| **El hielo** | Ice |
| **El fuego** | Fire |
| **El cielo** | Sky |
| **El sol** | Sun |
| **La luna** | Moon |
| **La estrella** | Star |
| **La estación / La temporada** | Season |

---

### 5. Directions & Coordinates (Rumbos y coordenadas)
| Spanish Term | English Translation |
|---|---|
| **El rumbo** | Direction |
| **El norte** | North |
| **El sur** | South |
| **El este** | East |
| **El oeste** | West |
| **El polo Norte** | North pole |
| **El polo Sur** | South pole |
| **El ecuador** | Equator |
| **La longitud** | Longitude |
| **La latitud** | Latitude |`
    },
    quiz: {
      title: "Geography Vocabulary Quiz",
      questions: [
        {
          text: "What is 'the beach' in Spanish?",
          a: "la playa", b: "la montaña", c: "el río", d: "el mar",
          correct: "A"
        },
        {
          text: "What geographical feature is 'río'?",
          a: "Lake", b: "Mountain", c: "River", d: "Sea",
          correct: "C"
        },
        {
          text: "How do you translate 'The mountain'?",
          a: "el lago", b: "la montaña", c: "el bosque", d: "la ciudad",
          correct: "B"
        }
      ]
    }
  },
  {
    name: "Essay Structure & Transitions",
    description: "Master essay structure, cohesive transitions, argumentative phrases, and drafting outlines in Spanish.",
    category: "Essay Writing",
    duration: "~20 Mins",
    icon: "bi-pencil-square",
    subtopics: [
      "Essay Structure",
      "Transition Words",
      "Argumentative Phrases",
      "Sample Outline"
    ],
    note: {
      title: "Spanish Essay Structure & Transitions",
      content: `### Overview
Writing a coherent essay in Spanish (un ensayo) requires a solid understanding of structural components, transitions, and professional vocabulary.

### Essay Structure
A standard essay consists of three main parts:
1. **La introducción** (Introduction) – Establishes the thesis statement (la tesis) and provides context.
2. **El desarrollo** (Body) – Contains paragraphs (párrafos) with arguments, evidence, and analysis.
3. **La conclusión** (Conclusion) – Summarizes the main points and restates the thesis in a new light.

### Essential Transition Words
To make your writing flow, use transitional phrases:

| Spanish Phrase | English Meaning | Usage Type |
|---|---|---|
| **En primer lugar** | In the first place / Firstly | Introduction / Ordering |
| **Por un lado** | On one hand | Comparing arguments |
| **Por otro lado** | On the other hand | Comparing arguments |
| **Además** | Furthermore / In addition | Adding information |
| **Sin embargo** | However | Contrasting ideas |
| **Por lo tanto** | Therefore | Showing consequence |
| **En resumen** | In summary / To conclude | Conclusion |
| **En conclusión** | In conclusion | Conclusion |

### Key Argumentative Phrases
- **En mi opinión...** (In my opinion...)
- **Es importante destacar que...** (It is important to highlight that...)
- **Desde mi punto de vista...** (From my point of view...)
- **Por consiguiente...** (Consequently...)

### Quick Summary
- ✓ Always start with a clear thesis (tesis).
- ✓ Structure your arguments into distinct body paragraphs.
- ✓ Use transitions (En primer lugar, además, sin embargo) to connect thoughts.
- ✓ Summarize your findings in la conclusión.`
    },
    quiz: {
      title: "Spanish Essay Structure & Transitions Quiz",
      questions: [
        {
          text: "Which word is best used to start a conclusion in a Spanish essay?",
          a: "Además", b: "En primer lugar", c: "En conclusión", d: "Por otro lado",
          correct: "C"
        },
        {
          text: "What does the transition word 'Sin embargo' mean in English?",
          a: "Furthermore", b: "However", c: "Therefore", d: "Firstly",
          correct: "B"
        },
        {
          text: "What is the Spanish word for 'thesis statement'?",
          a: "La tesis", b: "El párrafo", c: "El ensayo", d: "El tema",
          correct: "A"
        }
      ]
    }
  },
  {
    name: "Mi Familia",
    description: "Write an essay introducing your family in Spanish. Practice descriptions, ages, and relationship vocabulary.",
    category: "Essay Writing",
    duration: "~20 Mins",
    icon: "bi-people",
    subtopics: [
      "Immediate Family",
      "Extended Family",
      "Ages & Descriptions",
      "Occupations",
      "Sample Essay"
    ],
    note: {
      title: "Family Essay Guide (Mi Familia)",
      content: `### Introduction
Writing about your family is a common way to practice descriptive language and vocabulary in Spanish.

### Mi Familia
Combine all of that and try to introduce your family in Spanish. I’ll go first! Keep in mind that I’m still a super beginner, so I’m focusing on the basics here.

**Spanish:**
Mi familia es muy grande. Tengo seis hermanos – cuatro hermanos y dos hermanas. Soy el mayor. Tengo treinta y dos años.
Mi papá es doctor y mi mamá es enfermera. Ambos trabajan en un hospital.
Ya soy casado. Mi esposa se llama Rachel. Ella solo tiene un hermano. Ella también tiene una madrastra y un padrastro. Su familia me cae muy bien. Todavía no tenemos hijos.
Tengo abuelos por parte de mi madre. También tengo muchos tíos, tías, y primos.
Todavía no tengo sobrinos ni sobrinas, porque mis hermanos son jóvenes.

**English Translation:**
My family is very large. I have six siblings – four brothers and two sisters. I am the oldest. I’m thirty-two years old. My dad is a doctor and my mom is a nurse. Both work in a hospital.

I’m already married. My wife’s name is Rachel. She has only one brother. She also has a stepmother and stepfather. I like her family very much. We do not have children yet.

I have grandparents on my mother’s side. I also have many uncles, aunts, and cousins.

I don’t have any nephews or nieces yet, because my siblings are young.`
    },
    quiz: {
      title: "Mi Familia Essay Quiz",
      questions: [
        {
          text: "How do you translate 'My family is very large' into Spanish?",
          a: "Mi familia es muy pequeña.", b: "Mi familia es muy grande.", c: "Tengo una familia bonita.", d: "Mi familia tiene hermanos.",
          correct: "B"
        },
        {
          text: "What does 'doctor' mean in Spanish?",
          a: "Doctor", b: "Nurse", c: "Hospital", d: "Teacher",
          correct: "A"
        },
        {
          text: "Translate 'Wife' to Spanish:",
          a: "Hermana", b: "Madre", c: "Esposa", d: "Rachel",
          correct: "C"
        }
      ]
    }
  },
  {
    name: "Mi equipo favorito",
    description: "Write an essay about your favorite sports team in Spanish. Learn sports and descriptive vocabulary.",
    category: "Essay Writing",
    duration: "~20 Mins",
    icon: "bi-trophy",
    subtopics: [
      "Sports Teams",
      "Cricket & Stadiums",
      "Adjectives for Teams",
      "Colors & Identity",
      "Sample Essay"
    ],
    note: {
      title: "Sports Essay Guide (Mi equipo favorito)",
      content: `### Introduction
Writing about a favorite sports team is a great way to express preferences, colors, and describe sports actions in Spanish.

### Mi equipo favorito
Here is a sample essay introducing a favorite sports team.

**Spanish:**
Mi equipo favorito es el Chennai Super Kings. Me encanta verlos jugar al críquet en el estadio cada temporada. Son el mejor equipo de la Liga Premier de la India. Tienen jugadores increíbles que siempre juegan con mucha pasión. Su color amarillo es muy famoso en toda nuestra ciudad.

**English Translation:**
My favorite team is the Chennai Super Kings. I love watching them play cricket at the stadium every season. They are the best team in the Indian Premier League. They have incredible players who always play with great passion. Their yellow color is very famous all over our city.`
    },
    quiz: {
      title: "Mi equipo favorito Essay Quiz",
      questions: [
        {
          text: "What does 'críquet' mean in English?",
          a: "Cricket", b: "Soccer", c: "Season", d: "Stadium",
          correct: "A"
        },
        {
          text: "Which Spanish word means 'yellow'?",
          a: "Amarillo", b: "Azul", c: "Rojo", d: "Verde",
          correct: "A"
        },
        {
          text: "Translate 'estadio' to English:",
          a: "City", b: "Season", c: "Stadium", d: "Players",
          correct: "C"
        }
      ]
    }
  },
  {
    name: "Mi casa",
    description: "Write an essay describing your house in Spanish. Practice descriptions, household rooms, and location vocabulary.",
    category: "Essay Writing",
    duration: "~20 Mins",
    icon: "bi-house",
    subtopics: [
      "Home & Location",
      "Household Rooms",
      "Describing Spaces",
      "Family & Home",
      "Sample Essay"
    ],
    note: {
      title: "House Essay Guide (Mi casa)",
      content: `### Introduction
Writing about your home is a wonderful way to practice spatial descriptions, room vocabulary, and expressing personal feelings in Spanish.

### Mi casa
Here is a sample essay describing a home.

**Spanish:**
Mi casa está ubicada en la zona de Medavakkam en Chennai. Es una casa cómoda y muy bonita que tiene un pequeño jardín. En el interior, tenemos tres habitaciones, una cocina moderna y una sala de estar muy amplia. Es mi lugar favorito porque allí paso tiempo con mi familia. Siempre me siento muy feliz y relajado en mi hogar.

**English Translation:**
My house is located in the Medavakkam area in Chennai. It is a comfortable and very beautiful house that has a small garden. Inside, we have three bedrooms, a modern kitchen, and a very spacious living room. It is my favorite place because I spend time with my family there. I always feel very happy and relaxed in my home.`
    },
    quiz: {
      title: "Mi casa Essay Quiz",
      questions: [
        {
          text: "How do you say 'My house' in Spanish?",
          a: "Mi escuela", b: "Mi jardín", c: "Mi casa", d: "Mi cocina",
          correct: "C"
        },
        {
          text: "What does 'jardín' mean in English?",
          a: "Kitchen", b: "Garden", c: "Bedroom", d: "Living room",
          correct: "B"
        },
        {
          text: "Which Spanish word translates to 'happy'?",
          a: "Relajado", b: "Ubicada", c: "Feliz", d: "Cómoda",
          correct: "C"
        }
      ]
    }
  },
  {
    name: "Mi universidad",
    description: "Write an essay describing your university in Spanish. Practice school vocabulary, campus facilities, and university life terms.",
    category: "Essay Writing",
    duration: "~20 Mins",
    icon: "bi-mortarboard",
    subtopics: [
      "Academic Institutions",
      "Campus & Facilities",
      "Study Habits",
      "Friends & Learning",
      "Sample Essay"
    ],
    note: {
      title: "University Essay Guide (Mi universidad)",
      content: `### Introduction
Writing about your university is a great way to practice academic vocabulary, describe campus facilities, and discuss daily study routines in Spanish.

### Mi universidad
Here is a sample essay describing a university.

**Spanish:**
Actualmente estudio en la Universidad de Anna en Chennai. Es una institución histórica y muy prestigiosa en el campo de la ingeniería. El campus es grande, verde y tiene muchas instalaciones excelentes para los estudiantes. Me gusta mucho ir a clases allí y aprender cosas nuevas todos los días. Mis amigos y yo siempre estudiamos en la biblioteca.

**English Translation:**
I currently study at Anna University in Chennai. It is a historic and very prestigious institution in the field of engineering. The campus is large, green, and has many excellent facilities for students. I really like going to classes there and learning new things every day. My friends and I always study in the library.`
    },
    quiz: {
      title: "Mi universidad Essay Quiz",
      questions: [
        {
          text: "How do you translate 'University' to Spanish?",
          a: "La universidad", b: "La escuela", c: "La biblioteca", d: "La clase",
          correct: "A"
        },
        {
          text: "What does 'biblioteca' mean in English?",
          a: "Classroom", b: "Campus", c: "Library", d: "Laboratory",
          correct: "C"
        },
        {
          text: "Which Spanish word means 'prestigious'?",
          a: "Histórica", b: "Prestigiosa", c: "Excelente", d: "Grande",
          correct: "B"
        }
      ]
    }
  },
  {
    name: "Mi ciudad",
    description: "Write an essay describing your city in Spanish. Practice city infrastructure, local culture, and geographic expressions.",
    category: "Essay Writing",
    duration: "~20 Mins",
    icon: "bi-buildings",
    subtopics: [
      "Urban & City Life",
      "Local Culture",
      "Festival & Tradition",
      "Vibrant Atmosphere",
      "Sample Essay"
    ],
    note: {
      title: "City Essay Guide (Mi ciudad)",
      content: `### Introduction
Writing about your city is a great way to practice describing urban locations, geographical details, cultural characteristics, and daily lifestyle features in Spanish.

### Mi ciudad
Here is a sample essay describing a city.

**Spanish:**
Vivo en Chennai, una ciudad hermosa en el sur de la India. Es un lugar lleno de cultura, templos antiguos y playas increíbles. La comida tradicional es deliciosa y a la gente le encanta celebrar muchos festivales importantes. Aunque el tráfico puede ser un poco ruidoso, me encanta el ambiente vibrante de la ciudad. Es un lugar maravilloso para vivir y trabajar.

**English Translation:**
I live in Chennai, a beautiful city in southern India. It is a place full of culture, ancient temples, and incredible beaches. The traditional food is delicious and people love to celebrate many important festivals. Although the traffic can be a bit noisy, I love the vibrant atmosphere of the city. It is a wonderful place to live and work.`
    },
    quiz: {
      title: "Mi ciudad Essay Quiz",
      questions: [
        {
          text: "How do you translate 'City' into Spanish?",
          a: "El templo", b: "La playa", c: "La ciudad", d: "La casa",
          correct: "C"
        },
        {
          text: "What geographical feature is 'playa'?",
          a: "Mountain", b: "Temple", c: "Beach", d: "City",
          correct: "C"
        },
        {
          text: "Which Spanish adjective means 'vibrant'?",
          a: "Vibrante", b: "Hermosa", c: "Antiguo", d: "Ruidoso",
          correct: "A"
        }
      ]
    }
  }
];

async function run() {
  try {
    console.log("Connecting database to seed Spanish curriculum...");
    await db.initDb();
    console.log("Database initialized. System:", db.getDbType());

    // 1. First, clear all topics for Spanish (language_id = 4)
    // We already ran a manual clean, but let's make sure it's fully clean.
    console.log("Clearing existing Spanish topics...");
    await db.query("DELETE FROM Topics WHERE language_id = 4");

    // 2. Loop through our modules and insert them cleanly
    for (let i = 0; i < modulesData.length; i++) {
      const m = modulesData[i];
      console.log(`[Seed] Inserting Spanish Topic ${i+1}/${modulesData.length}: "${m.name}"...`);

      // A. Insert Topic
      const [topicRes] = await db.query(
        "INSERT INTO Topics (language_id, topic_name, topic_description) VALUES (?, ?, ?)",
        [4, m.name, m.description]
      );
      const topicId = topicRes.insertId;

      // B. Insert Notes
      if (m.note) {
        await db.query(
          "INSERT INTO Notes (topic_id, title, content) VALUES (?, ?, ?)",
          [topicId, m.note.title, m.note.content]
        );
      }

      // C. Insert Quiz
      if (m.quiz) {
        const [quizRes] = await db.query(
          "INSERT INTO Quizzes (topic_id, quiz_title, total_marks) VALUES (?, ?, ?)",
          [topicId, m.quiz.title, m.quiz.questions.length]
        );
        const quizId = quizRes.insertId;

        // D. Insert Questions
        for (const q of m.quiz.questions) {
          await db.query(
            "INSERT INTO Qs (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [quizId, q.text, q.a, q.b, q.c, q.d, q.correct]
          );
        }
      }
    }

    console.log("=============================================================");
    console.log(`  Successfully seeded ${modulesData.length} Spanish curriculum modules!        `);
    console.log("  Added Topics, detailed study Notes, Quizzes, & Questions. ");
    console.log("=============================================================");
    
    // Explicit SQLite syncing check - if MySQL is not active, SQLite direct seeding will also run.
    const dbPath = path.join(__dirname, 'database.sqlite');
    console.log("Attempting direct SQLite sync if database.sqlite is present...");
    await new Promise((resolve) => {
      try {
        const sqliteDb = new sqlite3.Database(dbPath, (err) => {
          if (err) {
            console.log("SQLite DB close/skip error:", err.message);
            return resolve();
          }
        });
        sqliteDb.run('PRAGMA foreign_keys = ON;');
        sqliteDb.serialize(() => {
          // Clear SQLite Spanish entries directly to keep it in sync
          sqliteDb.run("DELETE FROM Topics WHERE language_id = 4", [], (err) => {
            if (err) {
              console.log("SQLite clear skip.");
              sqliteDb.close();
              return resolve();
            }
            
            let pendingTopics = modulesData.length;
            if (pendingTopics === 0) {
              sqliteDb.close();
              return resolve();
            }

            // Seed SQLite Spanish entries
            modulesData.forEach((m) => {
              sqliteDb.run("INSERT INTO Topics (language_id, topic_name, topic_description) VALUES (?, ?, ?)", [4, m.name, m.description], function(err) {
                if (err) {
                  pendingTopics--;
                  if (pendingTopics === 0) {
                    sqliteDb.close();
                    resolve();
                  }
                  return;
                }
                const topicId = this.lastID;
                
                // Track remaining queries to serialize closing the db
                let queriesCount = 0;
                if (m.note) queriesCount++;
                if (m.quiz) queriesCount++;

                const checkDone = () => {
                  queriesCount--;
                  if (queriesCount <= 0) {
                    pendingTopics--;
                    if (pendingTopics === 0) {
                      console.log("Direct SQLite sync seed complete.");
                      sqliteDb.close();
                      resolve();
                    }
                  }
                };

                if (queriesCount === 0) {
                  pendingTopics--;
                  if (pendingTopics === 0) {
                    console.log("Direct SQLite sync seed complete.");
                    sqliteDb.close();
                    resolve();
                  }
                  return;
                }

                if (m.note) {
                  sqliteDb.run("INSERT INTO Notes (topic_id, title, content) VALUES (?, ?, ?)", [topicId, m.note.title, m.note.content], () => {
                    checkDone();
                  });
                }
                
                if (m.quiz) {
                  sqliteDb.run("INSERT INTO Quizzes (topic_id, quiz_title, total_marks) VALUES (?, ?, ?)", [topicId, m.quiz.title, m.quiz.questions.length], function(err) {
                    if (err) {
                      checkDone();
                      return;
                    }
                    const quizId = this.lastID;
                    let pendingQs = m.quiz.questions.length;
                    
                    if (pendingQs === 0) {
                      checkDone();
                      return;
                    }

                    m.quiz.questions.forEach((q) => {
                      sqliteDb.run("INSERT INTO Qs (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer) VALUES (?, ?, ?, ?, ?, ?, ?)",
                        [quizId, q.text, q.a, q.b, q.c, q.d, q.correct], () => {
                          pendingQs--;
                          if (pendingQs === 0) {
                            checkDone();
                          }
                        });
                    });
                  });
                }
              });
            });
          });
        });
      } catch (e) {
        console.log("Direct SQLite skip (not running locally or file absent):", e.message);
        resolve();
      }
    });

    process.exit(0);
  } catch (error) {
    console.error("Database seeding failure:", error);
    process.exit(1);
  }
}

run();
