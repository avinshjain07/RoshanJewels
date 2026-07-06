import CollectionPageLayout from '@layouts/CollectionPageLayout';
import { getPageContext } from '@services/collection.service';
import { COLLECTION_FILTERS } from '@constants/categories';
const PAGE_CONTEXT = getPageContext('kundan');
export default function Kundan() {
  return <CollectionPageLayout routeKey="kundan" pageContext={PAGE_CONTEXT} filterOptions={COLLECTION_FILTERS.kundan} pageRoute="/kundan" />;
}
