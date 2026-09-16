import CollectionPageLayout from '@layouts/CollectionPageLayout';
import { getPageContext } from '@services/collection.service';
import { COLLECTION_FILTERS } from '@constants/categories';
const PAGE_CONTEXT = getPageContext('bullion');
export default function Bullion() {
  return <CollectionPageLayout routeKey="bullion" pageContext={PAGE_CONTEXT} filterOptions={COLLECTION_FILTERS.bullion} pageRoute="/bullion" />;
}
