import CollectionPageLayout from '@layouts/CollectionPageLayout';
import { getPageContext } from '@services/collection.service';
import { COLLECTION_FILTERS } from '@constants/categories';
const PAGE_CONTEXT = getPageContext('silver');
export default function Silver() {
  return <CollectionPageLayout routeKey="silver" pageContext={PAGE_CONTEXT} filterOptions={COLLECTION_FILTERS.silver} pageRoute="/silver" />;
}
