using MongoDB.Driver;

namespace PhotoManager.MongoRepositories.Utils
{
    public static class Pagination
    {
        public const int PageIndexDefault = 1;
        public const int PageSizeDefault = 12;

        public static IFindFluent<T, T> Page<T>(this IFindFluent<T, T> records, int pageIndex, int pageSize)
        {
            if (!IsValid(records, pageIndex, pageSize))
            {
                pageIndex = PageIndexDefault;
                pageSize = PageSizeDefault;
            }

            return records.Skip((pageIndex - 1) * pageSize).Limit(pageSize);
        }

        private static bool IsValid<T>(IFindFluent<T, T> records, int pageIndex, int pageSize)
        {
            var countOfRecords = records.CountDocuments();
            var maxPageIndex = GetMaxPageIndex(countOfRecords, pageSize);

            return pageIndex >= 1 && pageIndex <= maxPageIndex;
        }

        private static long GetMaxPageIndex(long countOfRecords, int pageSize)
        {
            var maxPageIndex = countOfRecords / pageSize;
            if (countOfRecords % pageSize != 0)
            {
                maxPageIndex++;
            }

            return maxPageIndex;
        }
    }
}
