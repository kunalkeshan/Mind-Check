# How to Contribute to Mind Check's Curated Resources

Thank you for your interest in contributing to Mind Check's Curated Resources! Your valuable insights can empower individuals on their mental health journey. Here's a step-by-step guide on how you can contribute:

1. **Explore the `src/public/resources/` Directory:**
   - Navigate to the 'public/resources/' directory in [our GitHub repository](https://github.com/kunalkeshan/Mind-Check).
   - Here, you'll find all the resources written in Markdown format.

2. **Choose a Resource to Edit or Create a New One:**
   - Browse through the existing resources to see if there's an opportunity to enhance or update the content.
   - Alternatively, if you have valuable insights to share, you can create a new resource by following the same Markdown format.

3. **Edit or Create the Resource:**
   - Use a Markdown editor of your choice to edit an existing resource or create a new one from scratch.
   - Ensure that the content is relevant, informative, and aligns with our mission of promoting mental well-being.

4. **Update your content in the `src/data/resources.ts`.**
   - This is to ensure that the content reflects on the platform when a user is looking for it.
   - Also, ensure to place a proper title, the name of the markdown file, and associated tags for the same.

It should be in the following format.

```ts
{
    title: 'Title of the post',
    description: "A short  description",
    tags: ['General'], // 'Thoughts & Feelings', 'Activities & Personal Relationships', 'Physical Symptoms', 'Suicidal Urges'
    url: '<name of the markdown file without extension>',
    image: '/images/resources/introducing-mind-check.svg', // Can save and use from https://undraw.co/
    published: new Date('2023-07-16'), // yyyy-mm-dd
    author: {
        name: 'Your name',
        social: '<social link>',
    },
},
```

5. **Save and Submit Your Changes:**
   - Once you're satisfied with your edits or the new resource, save the Markdown file with a descriptive filename.

6. **Create a Pull Request:**
   - Submit your changes as a pull request through GitHub.
   - Our team will review your contribution and provide feedback or merge it into the repository if it meets our guidelines.

By following these steps, you'll be making a positive impact on the mental well-being of our users. Together, let's build a supportive community that empowers individuals to lead healthier, happier lives through knowledge sharing.

Thank you for being a part of our mission! Your contributions matter! 🌟
