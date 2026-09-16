import CollectionPageLayout from '@layouts/CollectionPageLayout';
import { getPageContext } from '@services/collection.service';
import { COLLECTION_FILTERS } from '@constants/categories';
const PAGE_CONTEXT = getPageContext('gifts');
export default function Gifts() {
  return <CollectionPageLayout routeKey="gifts" pageContext={PAGE_CONTEXT} filterOptions={COLLECTION_FILTERS.gifts} pageRoute="/gifts" />;
}
