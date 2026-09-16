import CollectionPageLayout from '@layouts/CollectionPageLayout';
import { getPageContext } from '@services/collection.service';
import { COLLECTION_FILTERS } from '@constants/categories';

const PAGE_CONTEXT = getPageContext('gold');

export default function Gold() {
  return (
    <CollectionPageLayout
      routeKey="gold"
      pageContext={PAGE_CONTEXT}
      filterOptions={COLLECTION_FILTERS.gold}
      pageRoute="/gold"
    />
  );
}
