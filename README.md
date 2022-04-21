## Install instruction

1. Install composer packages

```sh
composer install
```

2. Install dependencies

```sh
yarn install
```

3. Run compile process

```sh
yarn development
```

4. For the filesystem to work properly, you need to run the command below
```sh
php artisan storage:link
```

## Assumptions

- Guest can upload new file.
- Guest can remove file from list.
- Guest have preview uploaded file.

## Spent time

7 hours - The biggest time spent on the "preview" feature

## Future features

- Database storage of uploaded files
- Panel for viewing uploaded files
- A subpage that allows you to view the status of the uploaded file
- Notifications system (email, SMS) about file status change

## Thought of the test

Simple. I like it.

## About me

```json
{
    "fullName": "Lukasz Lupa",
    "email": "lukasz.lupa@gmail.com",
    "location": "Norwich, UK",
    "jobTitle": "Full Stack Developer",
    "education": [
        {
            "title": "Logistics Technician",
            "name": "Automotive School Complex",
            "location": "Nowy Sacz, Poland"
        }
    ],
    "experience": [
        {
            "title": "Full Stack Web Developer",
            "companyName": "Coplus",
            "location": "Norwich, UK"
        },
        {
            "title": "Web Developer",
            "companyName": "HAL Tech",
            "location": "Norwich, UK"
        },
        {
            "title": "Social Media Specialist",
            "companyName": "RPC Recycle",
            "location": "Norwich, UK"
        },
        {
            "title": "CEO & Web Developer",
            "companyName": "Profand",
            "location": "Nowy Sacz, Poland"
        }
    ]
}
```
