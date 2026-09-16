import CollectionPageLayout from '@layouts/CollectionPageLayout';
import { getPageContext } from '@services/collection.service';
import { COLLECTION_FILTERS } from '@constants/categories';
const PAGE_CONTEXT = getPageContext('beads');
export default function Beads() {
  return <CollectionPageLayout routeKey="beads" pageContext={PAGE_CONTEXT} filterOptions={COLLECTION_FILTERS.beads} pageRoute="/beads" />;
}
