// tests/News.test.ts
import { News } from '../src/domain/news';
import { Result } from '../src/core/logic/Result';

describe('News ValueObject', () => {
  const validProps = {
    source: 'BBC',
    author: 'John Doe',
    title: 'Breaking News',
    description: 'Some news description',
    url: 'https://news.com/article',
    publishedAt: '2025-09-27',
  };

  it('should create a News object with valid props', () => {
    const result = News.create(validProps);

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toBeInstanceOf(News);
    expect(result.getValue().title).toBe('Breaking News');
    expect(result.getValue().author).toBe('John Doe');
  });

  it('should fail if a required property is missing', () => {
    const invalidProps = { ...validProps, title: null }; // missing title
    const result = News.create(invalidProps as any);

    expect(result.isSuccess).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.error).toContain('title'); // Guard error message should mention title
  });

  it('should have correct getters', () => {
    const result = News.create(validProps);
    const news = result.getValue();

    expect(news.source).toBe(validProps.source);
    expect(news.author).toBe(validProps.author);
    expect(news.title).toBe(validProps.title);
    expect(news.description).toBe(validProps.description);
    expect(news.url).toBe(validProps.url);
    expect(news.publishedAt).toBe(validProps.publishedAt);
  });
});
