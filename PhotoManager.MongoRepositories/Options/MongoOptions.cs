namespace PhotoManager.MongoRepositories.Options
{
    public class MongoOptions
    {
        public string ConnectionString;

        public MongoOptions(string connectionString)
        {
            ConnectionString = connectionString;
        }
    }
}
