import CollectionPageLayout from '@layouts/CollectionPageLayout';
import { getPageContext } from '@services/collection.service';
import { COLLECTION_FILTERS } from '@constants/categories';

const PAGE_CONTEXT = getPageContext('diamond');

export default function Diamond() {
  return (
    <CollectionPageLayout
      routeKey="diamond"
      pageContext={PAGE_CONTEXT}
      filterOptions={COLLECTION_FILTERS.diamond}
      pageRoute="/diamond"
    />
  );
}
