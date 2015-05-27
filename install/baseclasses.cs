[Serializable]
[BsonKnownTypes(typeof(Category))]
abstract public class BaseMongoClass
{
    public BaseMongoClass()
    {
        Id = ObjectId.GenerateNewId();
        LastUpdated = DateTime.Now;
    }

    public ObjectId Id { get; set; }

    private string _Title;
    public string Title
    {
        get { return _Title; }
        set
        {
            _Title = value;
            OnTitleChanged();
        }
    }

    protected virtual void OnTitleChanged()
    {

    }

    [BsonDateTimeOptions(Kind = DateTimeKind.Local, Representation = BsonType.Int64)]
    public DateTime LastUpdated { get; set; }

    public virtual EntityRef CreateRef()
    {
        return new EntityRef() { Id = Id, Title = Title };
    }

    internal string CacheKey()
    {
        return "Object|" + Id.ToString();
    }
}

[Serializable]
[BsonIgnoreExtraElements]
public class EntityRef : IEquatable<EntityRef>
{
    public EntityRef()
    {

    }

    public ObjectId Id { get; set; }

    private string _Title;
    public string Title
    {
        get
        {
            return _Title;
        }
        set
        {
            _Title = value;
        }
    }

    public void Clear()
    {
        _Title = null;
        Id = ObjectId.Empty;
    }

    public bool IsEmpty()
    {
        return Id == ObjectId.Empty;
    }

    #region IEquatable<EntityRef> Members

    public bool Equals(EntityRef other)
    {
        // Check whether the compared object is null.
        if (Object.ReferenceEquals(other, null)) return false;

        // Check whether the compared object references the same data.
        if (Object.ReferenceEquals(this, other)) return true;

        // Check whether the objects’ properties are equal.
        return Id.Equals(other.Id);
    }

    public override int GetHashCode()
    {
        return Id.GetHashCode();
    }

    #endregion
}