import { Helmet } from 'react-helmet-async';
import { portfolioContent } from '../data/content';

export default function SEO() {
  const { hero } = portfolioContent;
  const title = `${hero.name} - DevOps Engineer Portfolio`;
  const description = hero.description;
  const url = window.location.origin;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="DevOps, Cloud Engineer, AWS, Kubernetes, Terraform, CI/CD" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${url}/og-image.jpg`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${url}/og-image.jpg`} />
    </Helmet>
  );
}
