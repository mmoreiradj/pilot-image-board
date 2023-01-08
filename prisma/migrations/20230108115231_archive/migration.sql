-- AlterTable
ALTER TABLE "post" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "thread" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false;

CREATE OR REPLACE
FUNCTION update_thread_timestamp()
   RETURNS TRIGGER
   LANGUAGE PLPGSQL
AS $$
BEGIN
UPDATE
    thread
SET
    updated_at = now()
WHERE
        thread.id = new.thread_id;

RETURN NEW;
END;
$$;

CREATE OR REPLACE
TRIGGER on_create_post
AFTER
INSERT
    ON
    post
FOR EACH ROW
EXECUTE PROCEDURE update_thread_timestamp();

CREATE OR REPLACE
FUNCTION update_post_archived()
   RETURNS TRIGGER
   LANGUAGE PLPGSQL
AS $$
BEGIN
UPDATE
    post
SET
    archived = new.archived
WHERE
        thread_id = new.id;

RETURN NEW;
END;
$$;

CREATE OR REPLACE
TRIGGER on_update_archived_thread
AFTER
UPDATE
    OF archived ON thread
    FOR EACH ROW
    EXECUTE PROCEDURE update_post_archived();
