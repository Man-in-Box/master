import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as nanoid from 'nanoid';
import * as cors from 'cors';

const app = express();
const port: number = 3000;

app.use(cors());

interface iPostSchema {
	title: string,
	text: string
}

interface iPost extends iPostSchema {
	id: string,
	updatePost({title, text}: iPostSchema): Post
};

class Post implements iPost {
	id: string = nanoid();
	title: string;
	text: string;
	constructor({ title, text }: iPostSchema) {
		this.title = title,
		this.text = text
	};

	updatePost({ title, text}: iPostSchema): Post {
		this.title = title;
		this.text = text;
		return this;
	}
};

let posts: iPost[] = [];

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.route('/posts')

	.get((req, res) => res.json(posts))

	.post((req, res) => {
		try {
			const newPost: Post = new Post(req.body);
			posts.push(newPost);
			res.json(newPost)
		} catch (e) {
			res.status(400)
		}
	})

	.delete((req, res) => {
		let removedPosts: number = 0;
		try {
			const { postIds }: { postIds: string[] } = req.body;
			posts.forEach((post: Post): void => {
				if (!postIds.includes(post.id)) {
					posts.splice(posts.indexOf(post), 1);
					removedPosts++;
				}
			});
			if (removedPosts !== postIds.length) throw new Error('Ivalid post Id');
			res.json(`Removed ${removedPosts} post${removedPosts === 1 ? 's' : '' }`);
		} catch(e) {
			res.status(400).json(`
				Invalid post Id.
				Removed ${removedPosts} post${removedPosts === 1 ? 's' : '' }
			`)
		}
	});

app.route('/posts/:postId')

	.get((req, res) => {
		try {
			const id: string = req.params.postId;
			const findPost: Post = posts.find((post: Post): boolean => post.id === id);
			res.json(findPost);
		} catch (e) {
			res.status(400).json('Invalid post Id');
		}
	})

	.put((req, res) => {
		try {
			const id: string = req.params.postId;
			const findPost: Post = posts.find((post: Post): boolean => post.id === id);
			const updatedPost: Post = findPost.updatePost(req.body);
			res.json(updatedPost);
		} catch (e) {
			res.status(400).json('Invalid post Id');
		}
	});

app.listen(port, () => console.log(`Listening on port ${port}!`));
