namespace Zero.Redis;

public class RedisOptions
{
    public string? Configuration { get; set; }
    public bool IsEnabled { get; set; }
    public int DefaultDatabase { get; set; }
}
