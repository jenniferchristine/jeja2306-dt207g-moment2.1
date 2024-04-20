### Jennifer Jakobsson


# Backend-baserad webbutveckling
### Moment 2.1, DT207G

<br>
<br>

# Introduktion till webbtjänster

>### Laboration i moment 2.1:
>Denna uppgift är den första delen av Moment 2 - Introduktion till webbtjänster. Detta är en REST-webbtjänst byggt med Express som hanterar arbetserfarenheter. Tjänsten innehar akronymen CRUD (Create Read Update Delete) för att hantera data och låter resurser begäras från annan ursprung. 
>
>APIet använder en PostgreSQL-databas och kan användas genom att köra kommando npm install för installation av nödvändiga npm-paket. Vidare behöver man köra installationsskriptet för att skapa databastabellerna nedan. En liveversion av webbtjänsten finns tillgänglig här: [Länk till API](https://jeja2306-dt207g-moment2-1.onrender.com/cv)

<br>

| Databas: cv | Tabell: workexperience |
|-----------------|-----------------|
| id | SERIAL PRIMARY KEY NOT NULL |
| companyname | VARCHAR(255) NOT NULL |
| jobtitle | VARCHAR(255) NOT NULL |
| location | VARCHAR(255) NOT NULL |
| description | TEXT |

<br>

### Användning av databas:

<br>

| Metod | Ändpunkt | Beskrivning |
|-----------------|-----------------|-----------------|
| GET | /cv | Hämtar databasen datan är lagrad i |
| GET | /cv/workexperience | Hämtar alla tillgängliga kurser |
| GET | /cv/workexperience/:id | Hämtar specifik kurs med angivet ID |
| POST | /cv/workexperience | Lagrar en ny jobberfarenhet |
| PUT | /cv/workexperience/:id | Uppdaterar en specifik jobberfarenhet |
| DELETE | /cv/workexperience/:id | Raderar en specifik jobberfarenhet |

<br>

#### Ett kurs-objekt returneras/skickas som JSON med följande struktur:

<br>

```json
{
   "companyname": "Frilansare",
   "jobtitle": "Logodesigner",
   "location": "Distans",
   "description": "Skapat logotyper åt privatperson och företag"
}
```
